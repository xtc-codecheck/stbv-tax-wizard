/**
 * Barrel-Export aller Standard-Vorlagen nach Cluster
 * @module utils/templates
 */

import { Template } from "@/types/stbvv";
import { einkommensteuerTemplates } from "./einkommensteuer";
import { euerPersonengesellschaftTemplates } from "./euer-personengesellschaft";
import { jahresabschlussTemplates } from "./jahresabschluss";
import { finanzbuchhaltungTemplates } from "./finanzbuchhaltung";
import { lohnbuchhaltungTemplates } from "./lohnbuchhaltung";
import { sonstigeSteuernTemplates } from "./sonstige-steuern";
import { beratungRechtsbehelfeTemplates } from "./beratung-rechtsbehelfe";

export { einkommensteuerTemplates } from "./einkommensteuer";
export { euerPersonengesellschaftTemplates } from "./euer-personengesellschaft";
export { jahresabschlussTemplates } from "./jahresabschluss";
export { finanzbuchhaltungTemplates } from "./finanzbuchhaltung";
export { lohnbuchhaltungTemplates } from "./lohnbuchhaltung";
export { sonstigeSteuernTemplates } from "./sonstige-steuern";
export { beratungRechtsbehelfeTemplates } from "./beratung-rechtsbehelfe";

/** Alle Standard-Vorlagen in fachlicher Cluster-Reihenfolge (SSOT) */
export const DEFAULT_TEMPLATES: Template[] = [
  ...einkommensteuerTemplates,
  ...euerPersonengesellschaftTemplates,
  ...jahresabschlussTemplates,
  ...finanzbuchhaltungTemplates,
  ...lohnbuchhaltungTemplates,
  ...sonstigeSteuernTemplates,
  ...beratungRechtsbehelfeTemplates,
];
