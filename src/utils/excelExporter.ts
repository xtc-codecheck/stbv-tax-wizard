import * as XLSX from 'xlsx';
import { Position, ClientData, Discount } from "@/types/stbvv";
import { calculatePosition, calculateTotal } from "./stbvvCalculator";
import { formatBillingDetails } from "./formatBillingDetails";
import { formatCurrency } from "@/lib/utils";

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
      'Gebühr': formatCurrency(calc.adjustedFee),
      'Auslagen': formatCurrency(calc.expenseFee),
      'Gesamt': formatCurrency(calc.totalNet * position.quantity)
    };
  });

  // Calculate totals
  const totals = calculateTotal(positions, documentFee, includeVAT, discount);

  // Prepare totals data
  const totalsData = [
    { 'Bezeichnung': '', 'Betrag': '' },
    { 'Bezeichnung': 'Summe netto aller Positionen', 'Betrag': formatCurrency(totals.positionsTotal) },
    { 'Bezeichnung': 'Dokumentenpauschale', 'Betrag': formatCurrency(totals.documentFee) },
  ];

  if (discount && discount.value > 0) {
    const discountLabel = discount.type === 'percentage' 
      ? `Rabatt (-${discount.value}%)` 
      : `Rabatt (-${formatCurrency(discount.value)})`;
    totalsData.push({ 'Bezeichnung': discountLabel, 'Betrag': formatCurrency(totals.discountAmount) });
  }

  totalsData.push({ 'Bezeichnung': 'Zwischensumme netto', 'Betrag': formatCurrency(totals.subtotalNet) });

  if (includeVAT) {
    totalsData.push({ 'Bezeichnung': 'Umsatzsteuer (19%)', 'Betrag': formatCurrency(totals.vatAmount) });
  }

  totalsData.push({ 'Bezeichnung': 'Gesamtsumme brutto', 'Betrag': formatCurrency(totals.totalGross) });

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
