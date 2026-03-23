/**
 * In-memory IP-based rate limiter for public API endpoints.
 * Prevents abuse of demo endpoints that call the Anthropic API.
 */

type Entry = { count: number; resetAt: number }

const stores = new Map<string, Map<string, Entry>>()
const dailyStore: { count: number; resetAt: number } = { count: 0, resetAt: Date.now() + 86_400_000 }

// Cleanup stale entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const store of stores.values()) {
    for (const [key, entry] of store) {
      if (entry.resetAt < now) store.delete(key)
    }
  }
}, 300_000)

export function rateLimit(
  name: string,
  ip: string,
  opts: { windowMs: number; maxRequests: number }
): { allowed: boolean; retryAfterMs: number } {
  const now = Date.now()
  if (!stores.has(name)) stores.set(name, new Map())
  const store = stores.get(name)!

  const entry = store.get(ip)
  if (!entry || entry.resetAt < now) {
    store.set(ip, { count: 1, resetAt: now + opts.windowMs })
    return { allowed: true, retryAfterMs: 0 }
  }

  entry.count++
  if (entry.count > opts.maxRequests) {
    return { allowed: false, retryAfterMs: entry.resetAt - now }
  }

  return { allowed: true, retryAfterMs: 0 }
}

export function checkDailyGlobalCap(cap: number): boolean {
  const now = Date.now()
  if (dailyStore.resetAt < now) {
    dailyStore.count = 0
    dailyStore.resetAt = now + 86_400_000
  }
  dailyStore.count++
  return dailyStore.count <= cap
}
