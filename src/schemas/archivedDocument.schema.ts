/**
 * Schema für archivierte Dokumente
 * @module schemas/archivedDocument
 */

import { z } from 'zod';
import { clientDataSchema } from './clientData.schema';
import { discountSchema } from './discount.schema';

/**
 * Flexibles Position-Schema für Archiv (akzeptiert Runtime-Typen)
 */
const archivedPositionSchema = z.object({
  id: z.string(),
  activity: z.string(),
  description: z.string().optional(),
  objectValue: z.number(),
  tenthRate: z.object({
    numerator: z.number(),
    denominator: z.number(),
  }),
  quantity: z.number(),
  feeTable: z.enum(['A', 'B', 'C', 'D']),
  applyExpenseFee: z.boolean(),
  billingType: z.enum(['objectValue', 'hourly', 'flatRate']),
  hourlyRate: z.number().optional(),
  hours: z.number().optional(),
  flatRate: z.number().optional(),
});

/**
 * Schema für ein archiviertes Dokument
 */
export const archivedDocumentSchema = z.object({
  id: z.string(),
  documentNumber: z.string(),
  documentType: z.enum(['Angebot', 'Rechnung']),
  createdAt: z.string(),
  invoiceDate: z.string(),
  servicePeriod: z.string().optional(),
  
  // Mandant
  clientData: clientDataSchema,
  
  // Positionen
  positions: z.array(archivedPositionSchema),
  
  // Finanzdaten
  subtotalNet: z.number(),
  documentFee: z.number(),
  discount: discountSchema.optional(),
  discountAmount: z.number().optional(),
  vatAmount: z.number(),
  totalGross: z.number(),
  includeVAT: z.boolean(),
  
  // Metadaten
  templateUsed: z.string().optional(),
  exportedAsPdf: z.boolean().default(true),
});

export type ArchivedDocument = z.infer<typeof archivedDocumentSchema>;

/**
 * Schema für das Dokumenten-Archiv
 */
export const documentArchiveSchema = z.object({
  version: z.number().default(1),
  documents: z.array(archivedDocumentSchema),
  lastUpdated: z.string(),
});

export type DocumentArchive = z.infer<typeof documentArchiveSchema>;
