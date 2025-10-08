import * as XLSX from 'xlsx';
import { Position, ClientData, Discount } from "@/types/stbvv";
import { calculatePosition, calculateTotal } from "./stbvvCalculator";
import { formatBillingDetails } from "./formatBillingDetails";

export const exportToExcel = (
  positions: Position[], 
  documentFee: number, 
  includeVAT: boolean,
  discount: Discount | null,
  documentType: 'quote' | 'invoice' = 'quote',
  clientData?: ClientData,
  invoiceNumber?: string,
  invoiceDate?: Date,
  servicePeriod?: string
) => {
  // Prepare data for positions
  const positionsData = positions.map((position, index) => {
    const calc = calculatePosition(position);
    const billingDetails = formatBillingDetails(position);
    
    return {
      'Position': index + 1,
      'Tätigkeit': position.activity,
      'Beschreibung': position.description || '-',
      'Details': billingDetails,
      'Anzahl': position.quantity,
      'Gebühr': `${calc.adjustedFee.toFixed(2)} €`,
      'Auslagen': `${calc.expenseFee.toFixed(2)} €`,
      'Gesamt': `${(calc.totalNet * position.quantity).toFixed(2)} €`
    };
  });

  // Calculate totals
  const totals = calculateTotal(positions, documentFee, includeVAT, discount);

  // Prepare totals data
  const totalsData = [
    { 'Bezeichnung': '', 'Betrag': '' },
    { 'Bezeichnung': 'Summe netto aller Positionen', 'Betrag': `${totals.positionsTotal.toFixed(2)} €` },
    { 'Bezeichnung': 'Dokumentenpauschale', 'Betrag': `${totals.documentFee.toFixed(2)} €` },
  ];

  if (discount && discount.value > 0) {
    const discountLabel = discount.type === 'percentage' 
      ? `Rabatt (-${discount.value}%)` 
      : `Rabatt (-${discount.value.toFixed(2)} €)`;
    totalsData.push({ 'Bezeichnung': discountLabel, 'Betrag': `${totals.discountAmount.toFixed(2)} €` });
  }

  totalsData.push({ 'Bezeichnung': 'Zwischensumme netto', 'Betrag': `${totals.subtotalNet.toFixed(2)} €` });

  if (includeVAT) {
    totalsData.push({ 'Bezeichnung': 'Umsatzsteuer (19%)', 'Betrag': `${totals.vatAmount.toFixed(2)} €` });
  }

  totalsData.push({ 'Bezeichnung': 'Gesamtsumme brutto', 'Betrag': `${totals.totalGross.toFixed(2)} €` });

  // Create workbook
  const wb = XLSX.utils.book_new();

  // Add metadata sheet
  const metadataData = [
    { 'Feld': 'Dokumenttyp', 'Wert': documentType === 'invoice' ? 'Rechnung' : 'Angebot' },
    { 'Feld': invoiceNumber ? (documentType === 'invoice' ? 'Rechnungs-Nr.' : 'Angebots-Nr.') : '', 'Wert': invoiceNumber || '' },
    { 'Feld': 'Datum', 'Wert': invoiceDate ? invoiceDate.toLocaleDateString('de-DE') : new Date().toLocaleDateString('de-DE') },
    { 'Feld': 'Leistungszeitraum', 'Wert': servicePeriod || '' },
  ];

  if (clientData && clientData.name) {
    metadataData.push(
      { 'Feld': '', 'Wert': '' },
      { 'Feld': 'Mandant', 'Wert': clientData.name },
      { 'Feld': 'Straße', 'Wert': clientData.street },
      { 'Feld': 'PLZ/Ort', 'Wert': `${clientData.postalCode} ${clientData.city}`.trim() },
      { 'Feld': 'E-Mail', 'Wert': clientData.email }
    );
  }

  const wsMetadata = XLSX.utils.json_to_sheet(metadataData);
  XLSX.utils.book_append_sheet(wb, wsMetadata, 'Metadaten');

  // Add positions sheet
  const wsPositions = XLSX.utils.json_to_sheet(positionsData);
  XLSX.utils.book_append_sheet(wb, wsPositions, 'Positionen');

  // Add totals sheet
  const wsTotals = XLSX.utils.json_to_sheet(totalsData);
  XLSX.utils.book_append_sheet(wb, wsTotals, 'Summen');

  // Generate filename
  const fileName = `stbvv-${documentType}-${invoiceNumber || new Date().toISOString().split('T')[0]}.xlsx`;

  // Save file
  XLSX.writeFile(wb, fileName);
};
