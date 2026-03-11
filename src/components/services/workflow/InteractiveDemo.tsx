'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Play, Plus, Trash2, ChevronDown, Zap, Mail, Sheet, MessageSquare, CheckSquare, Phone } from 'lucide-react';

const ACCENT = '#FF6B35';

interface TriggerOption {
  id: string;
  label: string;
  icon: typeof Mail;
  description: string;
}

interface ActionOption {
  id: string;
  label: string;
  icon: typeof Mail;
  simulationText: string;
}

const triggers: TriggerOption[] = [
  { id: 'form', label: 'New form submission', icon: CheckSquare, description: 'When someone submits a form on your website' },
  { id: 'email', label: 'New email received', icon: Mail, description: 'When a new email arrives in your inbox' },
  { id: 'schedule', label: 'Scheduled time', icon: Zap, description: 'Runs at a specific time every day or week' },
  { id: 'webhook', label: 'Webhook', icon: Zap, description: 'When an external system sends a notification' },
];

const actionOptions: ActionOption[] = [
  { id: 'send-email', label: 'Send email', icon: Mail, simulationText: 'Sending welcome email to new contact...' },
  { id: 'update-sheet', label: 'Update spreadsheet', icon: Sheet, simulationText: 'Adding row to Google Sheet...' },
  { id: 'post-slack', label: 'Post to Slack', icon: MessageSquare, simulationText: 'Posting notification to #sales channel...' },
  { id: 'create-task', label: 'Create task', icon: CheckSquare, simulationText: 'Creating follow-up task in project board...' },
  { id: 'send-whatsapp', label: 'Send WhatsApp', icon: Phone, simulationText: 'Sending WhatsApp confirmation message...' },
];

function TriggerDropdown({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const selected = triggers.find((t) => t.id === value);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 bg-bg-card border border-border rounded-xl px-5 py-4 text-left hover:border-white/20 transition-colors"
      >
        <div className="flex items-center gap-3">
          {selected ? (
            <>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${ACCENT}20` }}>
                <selected.icon className="w-4 h-4" style={{ color: ACCENT }} />
              </div>
              <div>
                <div className="text-white text-sm font-medium">{selected.label}</div>
                <div className="text-dim text-xs">{selected.description}</div>
              </div>
            </>
          ) : (
            <span className="text-dim text-sm">Select a trigger...</span>
          )}
        </div>
        <ChevronDown className={`w-4 h-4 text-dim transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 bg-bg-card border border-border rounded-xl overflow-hidden z-30 shadow-xl"
          >
            {triggers.map((trigger) => (
              <button
                key={trigger.id}
                onClick={() => {
                  onChange(trigger.id);
                  setOpen(false);
                }}
                className="w-full flex items-center gap-3 px-5 py-3 hover:bg-white/5 transition-colors text-left"
              >
                <trigger.icon className="w-4 h-4" style={{ color: ACCENT }} />
                <div>
                  <div className="text-white text-sm">{trigger.label}</div>
                  <div className="text-dim text-[11px]">{trigger.description}</div>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ActionStepDropdown({
  value,
  index,
  onChange,
  onRemove,
  usedIds,
}: {
  value: string | null;
  index: number;
  onChange: (id: string) => void;
  onRemove: () => void;
  usedIds: string[];
}) {
  const [open, setOpen] = useState(false);
  const selected = actionOptions.find((a) => a.id === value);
  const available = actionOptions.filter((a) => !usedIds.includes(a.id) || a.id === value);

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setOpen(!open)}
          className="flex-1 flex items-center justify-between gap-3 bg-bg-card border border-border rounded-xl px-5 py-3.5 text-left hover:border-white/20 transition-colors"
        >
          <div className="flex items-center gap-3">
            {selected ? (
              <>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${ACCENT}15` }}>
                  <selected.icon className="w-3.5 h-3.5" style={{ color: ACCENT }} />
                </div>
                <span className="text-white text-sm font-medium">{selected.label}</span>
              </>
            ) : (
              <span className="text-dim text-sm">Select action {index + 1}...</span>
            )}
          </div>
          <ChevronDown className={`w-4 h-4 text-dim transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
        <button
          onClick={onRemove}
          className="p-2.5 rounded-lg border border-border text-dim hover:text-[#FF4545] hover:border-[#FF4545]/30 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 bg-bg-card border border-border rounded-xl overflow-hidden z-30 shadow-xl"
          >
            {available.map((action) => (
              <button
                key={action.id}
                onClick={() => {
                  onChange(action.id);
                  setOpen(false);
                }}
                className="w-full flex items-center gap-3 px-5 py-3 hover:bg-white/5 transition-colors text-left"
              >
                <action.icon className="w-4 h-4" style={{ color: ACCENT }} />
                <span className="text-white text-sm">{action.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ConnectorLine() {
  return (
    <div className="flex justify-center py-1">
      <div className="w-px h-8 bg-gradient-to-b from-border to-transparent relative">
        <div
          className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
          style={{
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderTop: `6px solid rgba(255,255,255,0.1)`,
          }}
        />
      </div>
    </div>
  );
}

export default function InteractiveDemo() {
  const [trigger, setTrigger] = useState<string | null>(null);
  const [actions, setActions] = useState<(string | null)[]>([null]);
  const [simulating, setSimulating] = useState(false);
  const [simStep, setSimStep] = useState(-1);
  const [simDone, setSimDone] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start 0.3'],
  });
  const sectionOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const sectionScale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);

  const usedActionIds = actions.filter(Boolean) as string[];
  const canAddMore = actions.length < 3 && actions.every((a) => a !== null);
  const canSimulate = trigger !== null && actions.some((a) => a !== null) && !simulating;

  const addAction = useCallback(() => {
    if (actions.length < 3) {
      setActions((prev) => [...prev, null]);
    }
  }, [actions.length]);

  const removeAction = useCallback((index: number) => {
    setActions((prev) => {
      const next = prev.filter((_, i) => i !== index);
      return next.length === 0 ? [null] : next;
    });
  }, []);

  const updateAction = useCallback((index: number, id: string) => {
    setActions((prev) => prev.map((a, i) => (i === index ? id : a)));
  }, []);

  const simulate = useCallback(async () => {
    if (!canSimulate) return;
    setSimulating(true);
    setSimDone(false);
    setSimStep(-1);

    // Animate through trigger
    await new Promise((r) => setTimeout(r, 600));
    setSimStep(0); // trigger step

    // Animate through each action
    const activeActions = actions.filter(Boolean) as string[];
    for (let i = 0; i < activeActions.length; i++) {
      await new Promise((r) => setTimeout(r, 1200));
      setSimStep(i + 1);
    }

    await new Promise((r) => setTimeout(r, 800));
    setSimDone(true);
    setSimulating(false);
  }, [canSimulate, actions]);

  const reset = useCallback(() => {
    setTrigger(null);
    setActions([null]);
    setSimStep(-1);
    setSimDone(false);
    setSimulating(false);
  }, []);

  const selectedTrigger = triggers.find((t) => t.id === trigger);
  const activeActions = actions.filter(Boolean) as string[];

  return (
    <section ref={sectionRef} id="demo" className="py-section px-6 bg-bg-2">
      <motion.div
        style={{ opacity: sectionOpacity, scale: sectionScale }}
        className="max-w-2xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <span className="font-mono text-sm tracking-widest uppercase mb-3 block" style={{ color: ACCENT }}>
            INTERACTIVE DEMO
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Build a workflow <span style={{ color: ACCENT }}>in seconds</span>
          </h2>
          <p className="text-dim text-lg max-w-xl mx-auto">
            Pick a trigger, add actions, and simulate the automation. No code required.
          </p>
        </div>

        {/* Workflow Builder */}
        <div className="space-y-1">
          {/* Trigger label */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background: ACCENT }}>
              1
            </div>
            <span className="text-white text-sm font-semibold">When this happens...</span>
          </div>

          {/* Trigger dropdown */}
          <div className="relative">
            <TriggerDropdown value={trigger} onChange={setTrigger} />
            {/* Simulation glow on trigger */}
            {simulating && simStep === 0 && (
              <motion.div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{ border: `2px solid ${ACCENT}`, boxShadow: `0 0 20px ${ACCENT}40` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1 }}
              />
            )}
          </div>

          <ConnectorLine />

          {/* Actions label */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background: ACCENT }}>
              2
            </div>
            <span className="text-white text-sm font-semibold">Do these actions...</span>
          </div>

          {/* Action steps */}
          <div className="space-y-3">
            {actions.map((actionId, i) => (
              <div key={i} className="relative">
                <ActionStepDropdown
                  value={actionId}
                  index={i}
                  onChange={(id) => updateAction(i, id)}
                  onRemove={() => removeAction(i)}
                  usedIds={usedActionIds}
                />
                {/* Simulation glow on this action */}
                {simulating && simStep === i + 1 && (
                  <motion.div
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    style={{ border: `2px solid ${ACCENT}`, boxShadow: `0 0 20px ${ACCENT}40` }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1 }}
                  />
                )}
                {/* Simulation description */}
                <AnimatePresence>
                  {simulating && simStep === i + 1 && actionId && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-2 text-sm font-mono px-4"
                      style={{ color: ACCENT }}
                    >
                      {actionOptions.find((a) => a.id === actionId)?.simulationText}
                    </motion.div>
                  )}
                </AnimatePresence>
                {i < actions.length - 1 && <ConnectorLine />}
              </div>
            ))}
          </div>

          {/* Add action button */}
          {canAddMore && (
            <motion.button
              onClick={addAction}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full flex items-center justify-center gap-2 mt-3 py-3 rounded-xl border border-dashed border-border text-dim text-sm hover:text-white hover:border-white/20 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add another action
            </motion.button>
          )}

          {/* Simulate / Reset buttons */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={simulate}
              disabled={!canSimulate}
              className="flex items-center gap-2 px-8 py-3.5 rounded-full text-white font-semibold text-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:brightness-110"
              style={{ background: canSimulate ? ACCENT : `${ACCENT}50` }}
            >
              <Play className="w-4 h-4" />
              {simulating ? 'Running...' : 'Simulate'}
            </button>
            {(trigger || actions.some(Boolean)) && !simulating && (
              <button
                onClick={reset}
                className="px-6 py-3.5 rounded-full border border-border text-dim text-sm hover:text-white hover:border-white/20 transition-colors"
              >
                Reset
              </button>
            )}
          </div>

          {/* Simulation complete banner */}
          <AnimatePresence>
            {simDone && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 bg-bg-card border rounded-2xl p-6 text-center"
                style={{ borderColor: `${ACCENT}40` }}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Zap className="w-5 h-5" style={{ color: ACCENT }} />
                  <span className="text-white font-bold text-lg">Workflow Complete!</span>
                </div>
                <p className="text-dim text-sm mb-1">
                  {selectedTrigger?.label} triggered {activeActions.length} action{activeActions.length !== 1 ? 's' : ''} in under 3 seconds.
                </p>
                <p className="text-dim text-xs">
                  Imagine this running automatically, 24/7, with zero manual effort.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Powered by note */}
        <div className="flex items-center justify-center gap-2 text-dim/50 text-xs mt-8">
          <div className="w-2 h-2 rounded-full" style={{ background: ACCENT }} />
          Front-end simulation only — no real data is sent
        </div>
      </motion.div>
    </section>
  );
}
