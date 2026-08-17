/**
 * Barrel-Export aller Aktivitäts-Presets nach Cluster
 * @module utils/presets
 */

import { ActivityPreset } from "@/types/stbvv";
import { einkommensteuererklarungPresets } from "./einkommensteuererklarung";
import { jahresabschlussBuchfuhrungPresets } from "./jahresabschluss-buchfuhrung";
import { umsatzsteuerPresets } from "./umsatzsteuer";
import { gewerbeKorperschaftsteuerPresets } from "./gewerbe-korperschaftsteuer";
import { beratungsleistungenPresets } from "./beratungsleistungen";
import { rechtsbehelfsverfahrenPresets } from "./rechtsbehelfsverfahren";
import { erbschaftSchenkungsteuerPresets } from "./erbschaft-schenkungsteuer";
import { sonstigeSteuererklarungenPresets } from "./sonstige-steuererklarungen";
import { lohnbuchhaltungPresets } from "./lohnbuchhaltung";
import { sonstigeTatigkeitenPresets } from "./sonstige-tatigkeiten";

export { einkommensteuererklarungPresets } from "./einkommensteuererklarung";
export { jahresabschlussBuchfuhrungPresets } from "./jahresabschluss-buchfuhrung";
export { umsatzsteuerPresets } from "./umsatzsteuer";
export { gewerbeKorperschaftsteuerPresets } from "./gewerbe-korperschaftsteuer";
export { beratungsleistungenPresets } from "./beratungsleistungen";
export { rechtsbehelfsverfahrenPresets } from "./rechtsbehelfsverfahren";
export { erbschaftSchenkungsteuerPresets } from "./erbschaft-schenkungsteuer";
export { sonstigeSteuererklarungenPresets } from "./sonstige-steuererklarungen";
export { lohnbuchhaltungPresets } from "./lohnbuchhaltung";
export { sonstigeTatigkeitenPresets } from "./sonstige-tatigkeiten";

export const activityPresets: ActivityPreset[] = [
  ...einkommensteuererklarungPresets,
  ...jahresabschlussBuchfuhrungPresets,
  ...umsatzsteuerPresets,
  ...gewerbeKorperschaftsteuerPresets,
  ...beratungsleistungenPresets,
  ...rechtsbehelfsverfahrenPresets,
  ...erbschaftSchenkungsteuerPresets,
  ...sonstigeSteuererklarungenPresets,
  ...lohnbuchhaltungPresets,
  ...sonstigeTatigkeitenPresets,
];
