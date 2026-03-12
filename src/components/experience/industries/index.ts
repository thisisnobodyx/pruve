/* ================================================================
   INDUSTRY BARREL FILE
   Re-exports all industry data as a single array + lookup helpers.
   ================================================================ */

import type { Industry } from '../experience-data';
import { foodIndustries } from './food';
import { healthIndustries } from './health';
import { homeIndustries } from './home';
import { professionalIndustries } from './professional';
import { retailIndustries } from './retail';
import { autoIndustries } from './auto';
import { educationIndustries } from './education';
import { otherIndustries } from './other';

/* ------------------------------------------------------------------ */
/* COMBINED LIST                                                        */
/* ------------------------------------------------------------------ */

export const allIndustries: Industry[] = [
  ...foodIndustries,
  ...healthIndustries,
  ...homeIndustries,
  ...professionalIndustries,
  ...retailIndustries,
  ...autoIndustries,
  ...educationIndustries,
  ...otherIndustries,
];

/* ------------------------------------------------------------------ */
/* LOOKUP HELPERS                                                       */
/* ------------------------------------------------------------------ */

/** Get an industry by its unique ID. Returns undefined for unknown IDs. */
export function getIndustry(id: string): Industry | undefined {
  return allIndustries.find((i) => i.id === id);
}

/** Get all industries in a specific category. */
export function getIndustriesByCategory(category: string): Industry[] {
  return allIndustries.filter((i) => i.category === category);
}
