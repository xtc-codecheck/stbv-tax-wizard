/**
 * PDF-Generator mit korrektem A4-Seitenumbruch (Phase 3)
 * @module utils/pdfGenerator
 * 
 * Generiert professionelle PDFs mit:
 * - Korrektem Seitenumbruch bei langen Rechnungen
 * - Seitennummerierung
 * - Wiederholung der Kopfzeile auf jeder Seite
 * - Prüfsummen für Datenintegrität
 */

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Position, ClientData } from "@/types/stbvv";
import { calculatePosition, calculateTotal } from "./stbvvCalculator";
import { formatBillingDetails } from "./formatBillingDetails";
import { formatCurrency } from "@/lib/utils";
import { 
  STBVV_CURRENT_VERSION, 
  STBVV_DISCLAIMERS, 
  generateDocumentChecksum 
} from "@/constants/stbvv";

// ============== Konstanten ==============

/** A4-Seitenmaße in mm */
const PAGE = {
  WIDTH: 210,
  HEIGHT: 297,
  MARGIN_LEFT: 20,
  MARGIN_RIGHT: 20,
  MARGIN_TOP: 20,
  MARGIN_BOTTOM: 30,
  USABLE_WIDTH: 170, // 210 - 20 - 20
  FOOTER_START: 267, // 297 - 30
} as const;

/** Farben für das PDF */
const COLORS = {
  PRIMARY: [37, 99, 235] as [number, number, number],      // Blue
  SUCCESS: [5, 150, 105] as [number, number, number],      // Green
  WARNING: [255, 87, 34] as [number, number, number],      // Orange
  MUTED: [100, 100, 100] as [number, number, number],      // Gray
  BLACK: [0, 0, 0] as [number, number, number],
  LIGHT_BG: [248, 249, 250] as [number, number, number],
  WHITE: [255, 255, 255] as [number, number, number],
} as const;

// ============== Types ==============

export interface PDFGeneratorOptions {
  positions: Position[];
  documentFee: number;
  includeVAT: boolean;
  discount: { type: 'percentage' | 'fixed'; value: number } | null;
  documentType?: 'quote' | 'invoice';
  clientData?: ClientData;
  invoiceNumber?: string;
  invoiceDate?: Date;
  servicePeriod?: string;
  branding?: BrandingSettings;
}

interface BrandingSettings {
  companyName?: string;
  street?: string;
  postalCode?: string;
  city?: string;
  phone?: string;
  email?: string;
  taxNumber?: string;
  bankName?: string;
  iban?: string;
  bic?: string;
}

interface PDFContext {
  doc: jsPDF;
  pageNumber: number;
  totalPages: number;
  options: PDFGeneratorOptions;
  documentTitle: string;
}

// ============== Hilfsfunktionen ==============

/**
 * Fügt Seitennummer und Footer auf jeder Seite hinzu
 */
const addPageFooter = (ctx: PDFContext): void => {
  const { doc, pageNumber, totalPages, options } = ctx;
  const { branding, documentType = 'quote' } = options;
  
  const footerY = PAGE.FOOTER_START;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...COLORS.MUTED);
  
  // Rechtlicher Hinweis mit Versionierung
  doc.text(
    STBVV_DISCLAIMERS.medium,
    PAGE.MARGIN_LEFT,
    footerY
  );
  doc.text(
    documentType === 'quote' ? STBVV_DISCLAIMERS.quote : STBVV_DISCLAIMERS.invoice,
    PAGE.MARGIN_LEFT,
    footerY + 4
  );
  
  // Branding-Informationen
  if (branding) {
    let brandFooterY = footerY + 10;
    doc.setFontSize(6);
    
    const brandingParts: string[] = [];
    if (branding.companyName) brandingParts.push(branding.companyName);
    if (branding.taxNumber) brandingParts.push(`St.-Nr.: ${branding.taxNumber}`);
    if (branding.bankName && branding.iban) {
      brandingParts.push(`${branding.bankName} | IBAN: ${branding.iban}`);
    }
    
    if (brandingParts.length > 0) {
      doc.text(brandingParts.join(' | '), PAGE.MARGIN_LEFT, brandFooterY);
    }
  }
  
  // Seitennummer (zentriert)
  doc.setFontSize(8);
  doc.text(
    `Seite ${pageNumber} von ${totalPages}`,
    PAGE.WIDTH / 2,
    PAGE.HEIGHT - 10,
    { align: 'center' }
  );
};

/**
 * Fügt eine neue Seite hinzu und aktualisiert den Kontext
 */
const addNewPage = (ctx: PDFContext): number => {
  ctx.doc.addPage();
  ctx.pageNumber++;
  
  // Kopfzeile für Folgeseiten
  ctx.doc.setFontSize(10);
  ctx.doc.setTextColor(...COLORS.MUTED);
  ctx.doc.text(
    `${ctx.documentTitle} - Fortsetzung`,
    PAGE.MARGIN_LEFT,
    PAGE.MARGIN_TOP
  );
  
  if (ctx.options.invoiceNumber) {
    ctx.doc.text(
      `Nr.: ${ctx.options.invoiceNumber}`,
      PAGE.WIDTH - PAGE.MARGIN_RIGHT,
      PAGE.MARGIN_TOP,
      { align: 'right' }
    );
  }
  
  return PAGE.MARGIN_TOP + 15;
};

/**
 * Prüft ob genug Platz auf der aktuellen Seite ist
 */
const checkPageBreak = (ctx: PDFContext, yPosition: number, requiredSpace: number): number => {
  if (yPosition + requiredSpace > PAGE.FOOTER_START - 10) {
    return addNewPage(ctx);
  }
  return yPosition;
};

/**
 * Berechnet die Gesamtseitenzahl vorab
 */
const calculateTotalPages = (options: PDFGeneratorOptions): number => {
  const { positions, discount, includeVAT, clientData, invoiceNumber } = options;
  
  // Geschätzte Höhe pro Element
  const HEADER_HEIGHT = 50;
  const METADATA_HEIGHT = invoiceNumber ? 25 : 15;
  const CLIENT_HEIGHT = clientData?.name ? 45 : 0;
  const ROW_HEIGHT = 12;
  const TOTALS_HEIGHT = includeVAT ? 70 : 55;
  const DISCOUNT_HEIGHT = discount?.value ? 10 : 0;
  
  let contentHeight = HEADER_HEIGHT + METADATA_HEIGHT + CLIENT_HEIGHT + 
                      (positions.length * ROW_HEIGHT) + 
                      TOTALS_HEIGHT + DISCOUNT_HEIGHT + 40; // 40 for signatures
  
  const usableHeight = PAGE.FOOTER_START - PAGE.MARGIN_TOP;
  return Math.ceil(contentHeight / usableHeight);
};

// ============== Hauptfunktion ==============

/**
 * Erstellt das PDF-Dokument mit korrektem Seitenumbruch
 */
const createPDFDocument = (options: PDFGeneratorOptions): jsPDF => {
  const {
    positions,
    documentFee,
    includeVAT,
    discount,
    documentType = 'quote',
    clientData,
    invoiceNumber,
    invoiceDate,
    servicePeriod,
    branding,
  } = options;

  const doc = new jsPDF();
  const totals = calculateTotal(positions, documentFee, includeVAT, discount);
  const documentTitle = documentType === 'quote' ? 'Angebot' : 'Rechnung';
  
  // Kontext für Seitenverwaltung
  const ctx: PDFContext = {
    doc,
    pageNumber: 1,
    totalPages: calculateTotalPages(options),
    options,
    documentTitle: `STBVV-${documentTitle}`,
  };
  
  let yPosition = PAGE.MARGIN_TOP;
  
  // ============== KOPFZEILE ==============
  
  doc.setFontSize(24);
  doc.setTextColor(...COLORS.PRIMARY);
  doc.text(`STBVV-${documentTitle}`, PAGE.MARGIN_LEFT, yPosition);
  
  yPosition += 10;
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.MUTED);
  doc.text(`Steuerberatervergütung nach StBVV ${STBVV_CURRENT_VERSION.version} (gültig ab ${new Date(STBVV_CURRENT_VERSION.effectiveDate).toLocaleDateString('de-DE')})`, PAGE.MARGIN_LEFT, yPosition);
  
  // Branding (rechte Seite)
  if (branding?.companyName) {
    doc.setFontSize(9);
    doc.setTextColor(...COLORS.BLACK);
    let brandingY = PAGE.MARGIN_TOP;
    
    doc.setFont('helvetica', 'bold');
    doc.text(branding.companyName, PAGE.WIDTH - PAGE.MARGIN_RIGHT, brandingY, { align: 'right' });
    brandingY += 5;
    doc.setFont('helvetica', 'normal');
    
    if (branding.street) {
      doc.text(branding.street, PAGE.WIDTH - PAGE.MARGIN_RIGHT, brandingY, { align: 'right' });
      brandingY += 4;
    }
    if (branding.postalCode || branding.city) {
      doc.text(`${branding.postalCode || ''} ${branding.city || ''}`.trim(), PAGE.WIDTH - PAGE.MARGIN_RIGHT, brandingY, { align: 'right' });
      brandingY += 4;
    }
    if (branding.phone) {
      doc.text(`Tel: ${branding.phone}`, PAGE.WIDTH - PAGE.MARGIN_RIGHT, brandingY, { align: 'right' });
      brandingY += 4;
    }
    if (branding.email) {
      doc.text(branding.email, PAGE.WIDTH - PAGE.MARGIN_RIGHT, brandingY, { align: 'right' });
    }
  }
  
  yPosition += 15;
  
  // ============== DOKUMENT-METADATEN ==============
  
  if (invoiceNumber || invoiceDate || servicePeriod) {
    doc.setFontSize(10);
    doc.setTextColor(...COLORS.BLACK);
    
    if (invoiceNumber) {
      doc.text(`${documentType === 'invoice' ? 'Rechnungs-Nr.' : 'Angebots-Nr.'}: ${invoiceNumber}`, PAGE.MARGIN_LEFT, yPosition);
      yPosition += 6;
    }
    if (invoiceDate) {
      doc.text(`Datum: ${invoiceDate.toLocaleDateString('de-DE')}`, PAGE.MARGIN_LEFT, yPosition);
      yPosition += 6;
    }
    if (servicePeriod) {
      doc.text(`Leistungszeitraum: ${servicePeriod}`, PAGE.MARGIN_LEFT, yPosition);
      yPosition += 6;
    }
    yPosition += 5;
  } else {
    doc.setFontSize(10);
    doc.setTextColor(...COLORS.BLACK);
    doc.text(`Erstellt am: ${new Date().toLocaleDateString('de-DE')}`, PAGE.MARGIN_LEFT, yPosition);
    yPosition += 10;
  }
  
  // ============== MANDANT-INFO ==============
  
  if (clientData && (clientData.name || clientData.street || clientData.postalCode || clientData.city || clientData.email)) {
    doc.setFillColor(...COLORS.LIGHT_BG);
    doc.rect(PAGE.MARGIN_LEFT, yPosition, 85, 30, 'F');
    
    doc.setFontSize(11);
    doc.setTextColor(...COLORS.PRIMARY);
    doc.text('Mandant:', PAGE.MARGIN_LEFT + 5, yPosition + 7);
    
    doc.setFontSize(10);
    doc.setTextColor(...COLORS.BLACK);
    let clientYPos = yPosition + 13;
    
    if (clientData.name) {
      doc.setFont('helvetica', 'bold');
      doc.text(clientData.name, PAGE.MARGIN_LEFT + 5, clientYPos);
      clientYPos += 5;
      doc.setFont('helvetica', 'normal');
    }
    if (clientData.street) {
      doc.text(clientData.street, PAGE.MARGIN_LEFT + 5, clientYPos);
      clientYPos += 5;
    }
    if (clientData.postalCode || clientData.city) {
      doc.text(`${clientData.postalCode || ''} ${clientData.city || ''}`.trim(), PAGE.MARGIN_LEFT + 5, clientYPos);
      clientYPos += 5;
    }
    if (clientData.email && clientYPos < yPosition + 28) {
      doc.text(clientData.email, PAGE.MARGIN_LEFT + 5, clientYPos);
    }
    
    yPosition += 40;
  }
  
  // ============== POSITIONS-TABELLE ==============
  
  const tableData = positions.map((position, index) => {
    const calc = calculatePosition(position);
    const billingDetails = formatBillingDetails(position);
    
    return [
      (index + 1).toString(),
      position.activity,
      position.description || '-',
      billingDetails,
      position.quantity.toString(),
      formatCurrency(calc.adjustedFee),
      formatCurrency(calc.expenseFee),
      formatCurrency(calc.totalNet * position.quantity)
    ];
  });
  
  autoTable(doc, {
    startY: yPosition,
    head: [['Pos.', 'Tätigkeit', 'Beschreibung', 'Details', 'Anz.', 'Gebühr', 'Auslagen', 'Gesamt']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: COLORS.LIGHT_BG,
      textColor: COLORS.BLACK,
      fontStyle: 'bold',
      fontSize: 9
    },
    bodyStyles: {
      fontSize: 8,
      textColor: COLORS.BLACK
    },
    columnStyles: {
      0: { cellWidth: 12 },
      1: { cellWidth: 45 },
      2: { cellWidth: 35, fontSize: 7, textColor: COLORS.MUTED, fontStyle: 'italic' },
      3: { cellWidth: 40 },
      4: { cellWidth: 12, halign: 'center' },
      5: { cellWidth: 22, halign: 'right' },
      6: { cellWidth: 22, halign: 'right' },
      7: { cellWidth: 22, halign: 'right' }
    },
    margin: { left: PAGE.MARGIN_LEFT, right: PAGE.MARGIN_RIGHT, bottom: 40 },
    // Seitenumbruch-Handling
    showHead: 'everyPage',
    didDrawPage: (data) => {
      // Aktualisiere Seitenzähler wenn neue Seite erstellt wurde
      const currentPage = doc.getCurrentPageInfo().pageNumber;
      if (currentPage > ctx.pageNumber) {
        ctx.pageNumber = currentPage;
        ctx.totalPages = Math.max(ctx.totalPages, currentPage);
      }
    },
    willDrawCell: (data) => {
      // Verhindere Zellenaufteilung bei kritischen Zellen
      if (data.section === 'body' && data.row.index === tableData.length - 1) {
        // Letzte Zeile - stelle sicher, dass Summen auf gleicher Seite sind
      }
    },
  });
  
  // ============== SUMMEN-BEREICH ==============
  
  let finalY = (doc as any).lastAutoTable.finalY + 10;
  
  // Prüfe ob genug Platz für Summen
  const summaryHeight = includeVAT ? 60 : 50;
  if (finalY + summaryHeight > PAGE.FOOTER_START - 20) {
    doc.addPage();
    ctx.pageNumber++;
    ctx.totalPages = Math.max(ctx.totalPages, ctx.pageNumber);
    finalY = PAGE.MARGIN_TOP + 10;
    
    // Mini-Header auf neuer Seite
    doc.setFontSize(10);
    doc.setTextColor(...COLORS.MUTED);
    doc.text(`${ctx.documentTitle} - Zusammenfassung`, PAGE.MARGIN_LEFT, PAGE.MARGIN_TOP);
  }
  
  // Summen-Box
  const boxHeight = includeVAT ? 
    (discount?.value ? 55 : 45) : 
    (discount?.value ? 45 : 35);
  
  doc.setFillColor(...COLORS.LIGHT_BG);
  doc.rect(PAGE.MARGIN_LEFT, finalY, PAGE.USABLE_WIDTH, boxHeight, 'F');
  
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.BLACK);
  
  let totalY = finalY + 8;
  const valueX = PAGE.WIDTH - PAGE.MARGIN_RIGHT - 5;
  
  doc.text('Summe netto aller Positionen:', PAGE.MARGIN_LEFT + 5, totalY);
  doc.text(formatCurrency(totals.positionsTotal), valueX, totalY, { align: 'right' });
  
  totalY += 7;
  doc.text('Dokumentenpauschale:', PAGE.MARGIN_LEFT + 5, totalY);
  doc.text(formatCurrency(totals.documentFee), valueX, totalY, { align: 'right' });
  
  if (discount && discount.value > 0) {
    totalY += 7;
    const discountLabel = discount.type === 'percentage' 
      ? `Rabatt (-${discount.value}%)` 
      : `Rabatt (-${formatCurrency(discount.value)})`;
    doc.setTextColor(...COLORS.WARNING);
    doc.text(discountLabel, PAGE.MARGIN_LEFT + 5, totalY);
    doc.text(`-${formatCurrency(totals.discountAmount)}`, valueX, totalY, { align: 'right' });
    doc.setTextColor(...COLORS.BLACK);
  }
  
  totalY += 7;
  doc.text('Zwischensumme netto:', PAGE.MARGIN_LEFT + 5, totalY);
  doc.text(formatCurrency(totals.subtotalNet), valueX, totalY, { align: 'right' });
  
  if (includeVAT) {
    totalY += 7;
    doc.text('Umsatzsteuer (19%):', PAGE.MARGIN_LEFT + 5, totalY);
    doc.text(formatCurrency(totals.vatAmount), valueX, totalY, { align: 'right' });
  }
  
  // Gesamtsumme hervorgehoben
  totalY += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...COLORS.SUCCESS);
  doc.text('Gesamtsumme brutto:', PAGE.MARGIN_LEFT + 5, totalY);
  doc.text(formatCurrency(totals.totalGross), valueX, totalY, { align: 'right' });
  
  // ============== PRÜFSUMME (Qualitätssicherung) ==============
  
  const checksumY = totalY + 15;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  doc.setTextColor(...COLORS.MUTED);
  
  // Strukturierte Prüfsumme mit Versionierung
  const checksum = generateDocumentChecksum(positions.length, totals.totalGross, invoiceNumber);
  doc.text(`Prüfziffer: ${checksum}`, PAGE.WIDTH - PAGE.MARGIN_RIGHT, checksumY, { align: 'right' });
  
  // ============== UNTERSCHRIFTSZEILEN ==============
  
  const signatureY = Math.min(checksumY + 20, PAGE.FOOTER_START - 25);
  
  doc.setDrawColor(200, 200, 200);
  doc.line(PAGE.MARGIN_LEFT, signatureY, 85, signatureY);
  doc.line(105, signatureY, PAGE.WIDTH - PAGE.MARGIN_RIGHT, signatureY);
  
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.MUTED);
  doc.text('Datum', PAGE.MARGIN_LEFT, signatureY + 5);
  doc.text('Unterschrift', 105, signatureY + 5);
  
  // ============== FOOTER AUF ALLEN SEITEN ==============
  
  const totalPagesCount = doc.getNumberOfPages();
  ctx.totalPages = totalPagesCount;
  
  for (let i = 1; i <= totalPagesCount; i++) {
    doc.setPage(i);
    ctx.pageNumber = i;
    addPageFooter(ctx);
  }

  return doc;
};

// ============== Öffentliche API ==============

/**
 * Generiert PDF und speichert es direkt
 */
export const generatePDF = (
  positions: Position[], 
  documentFee: number, 
  includeVAT: boolean,
  discount: { type: 'percentage' | 'fixed'; value: number } | null,
  documentType: 'quote' | 'invoice' = 'quote',
  clientData?: ClientData,
  invoiceNumber?: string,
  invoiceDate?: Date,
  servicePeriod?: string,
  branding?: BrandingSettings
) => {
  const doc = createPDFDocument({
    positions,
    documentFee,
    includeVAT,
    discount,
    documentType,
    clientData,
    invoiceNumber,
    invoiceDate,
    servicePeriod,
    branding,
  });
  
  const fileName = `stbvv-${documentType}-${invoiceNumber || new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};

/**
 * Generiert PDF und gibt Blob-URL für Vorschau zurück
 */
export const generatePDFPreview = (options: PDFGeneratorOptions): string => {
  const doc = createPDFDocument(options);
  return doc.output('bloburl').toString();
};

/**
 * Generiert PDF und gibt Blob für Download zurück
 */
export const generatePDFBlob = (options: PDFGeneratorOptions): Blob => {
  const doc = createPDFDocument(options);
  return doc.output('blob');
};

/**
 * Lädt PDF von Blob herunter
 */
export const downloadPDFFromBlob = (blob: Blob, options: PDFGeneratorOptions): void => {
  const { documentType = 'quote', invoiceNumber } = options;
  const fileName = `stbvv-${documentType}-${invoiceNumber || new Date().toISOString().split('T')[0]}.pdf`;
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

/**
 * Validiert PDF-Optionen vor der Generierung
 */
export const validatePDFOptions = (options: PDFGeneratorOptions): { 
  isValid: boolean; 
  errors: string[] 
} => {
  const errors: string[] = [];
  
  if (!options.positions || options.positions.length === 0) {
    errors.push('Mindestens eine Position erforderlich');
  }
  
  if (options.positions.length > 100) {
    errors.push('Maximal 100 Positionen pro Dokument erlaubt');
  }
  
  options.positions.forEach((pos, idx) => {
    if (!pos.activity) {
      errors.push(`Position ${idx + 1}: Tätigkeit fehlt`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};
