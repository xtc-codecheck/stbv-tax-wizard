/**
 * Aktivitäts-Presets (Barrel) — Module liegen unter utils/presets/
 * @module utils/activityPresets
 */

import { ActivityPreset } from "@/types/stbvv";
import { activityPresets } from "./presets";

export { activityPresets };
export * from "./presets";

export const getActivityPreset = (activity: string): ActivityPreset | undefined => {
  return activityPresets.find(preset => preset.activity === activity);
};
