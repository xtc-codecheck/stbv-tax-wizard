import { Position, BrandingSettings } from "@/types/stbvv";
import { calculatePosition } from "@/utils/stbvvCalculator";
import { euroToCent, centToEuro, percentOfCent, addCent } from "@/utils/centArithmetic";
import { VAT_RATE_PERCENT } from "@/constants";
import { STBVV_CURRENT_VERSION, generateDocumentChecksum } from "@/constants/stbvv";

const formatNumber = (value: number): string => {
  return value.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

interface ExportData {
  positions: Position[];
  totals: {
    positionsTotal: number;
    documentFee: number;
    discountAmount: number;
    subtotalNet: number;
    vatAmount: number;
    totalGross: number;
  };
  clientData?: {
    name: string;
    street: string;
    postalCode: string;
    city: string;
  };
  invoiceNumber?: string;
  brandingSettings?: BrandingSettings;
}

export const exportToCSV = (data: ExportData): void => {
  const { positions, totals, clientData, invoiceNumber, brandingSettings } = data;
  
  // Prüfsumme generieren
  const checksum = generateDocumentChecksum(positions.length, totals.totalGross, invoiceNumber);
  
  // CSV Header
  let csvContent = "data:text/csv;charset=utf-8,";
  
  // Legal header with StBVV version
  csvContent += `Rechtsgrundlage,StBVV ${STBVV_CURRENT_VERSION.version} (${STBVV_CURRENT_VERSION.federalGazetteRef})\n`;
  csvContent += `Gültig ab,${new Date(STBVV_CURRENT_VERSION.effectiveDate).toLocaleDateString('de-DE')}\n`;
  csvContent += `Prüfsumme,${checksum}\n`;
  csvContent += "\n";
  
  // Invoice Header Info
  if (invoiceNumber) {
    csvContent += `Rechnungsnummer,${invoiceNumber}\n`;
  }
  if (brandingSettings?.companyName) {
    csvContent += `Kanzlei,${brandingSettings.companyName}\n`;
  }
  if (clientData?.name) {
    csvContent += `Mandant,${clientData.name}\n`;
  }
  csvContent += "\n";
  
  // Table Headers
  csvContent += "Position,Tätigkeit,Beschreibung,Abrechnungsart,Objektwert (€),Stundenanzahl,Stundensatz (€),Pauschalgebühr (€),Gebühr netto (€),MwSt. (€),Gebühr brutto (€)\n";
  
  // Table Rows
  positions.forEach((pos, index) => {
    const objectValue = pos.objectValue ? formatNumber(pos.objectValue) : "";
    const hours = pos.hours ? formatNumber(pos.hours) : "";
    const hourlyRate = pos.hourlyRate ? formatNumber(pos.hourlyRate) : "";
    const flatRate = pos.flatRate ? formatNumber(pos.flatRate) : "";
    
    // Calculate totals for this position
    const calculation = calculatePosition(pos);
    const totalNet = formatNumber(calculation.totalNet);
    const netCent = euroToCent(calculation.totalNet);
    const vatCent = percentOfCent(netCent, VAT_RATE_PERCENT);
    const totalVat = formatNumber(centToEuro(vatCent));
    const totalGross = formatNumber(centToEuro(addCent(netCent, vatCent)));
    
    const description = pos.description?.replace(/,/g, ";").replace(/\n/g, " ") || "";
    const activity = pos.activity?.replace(/,/g, ";") || "";
    
    csvContent += `${index + 1},${activity},${description},${pos.billingType},${objectValue},${hours},${hourlyRate},${flatRate},${totalNet},${totalVat},${totalGross}\n`;
  });
  
  // Totals
  csvContent += "\n";
  csvContent += `,,,,,,,,Positionen gesamt,${formatNumber(totals.positionsTotal)}\n`;
  csvContent += `,,,,,,,,Dokumentenpauschale,${formatNumber(totals.documentFee)}\n`;
  if (totals.discountAmount > 0) {
    csvContent += `,,,,,,,,Rabatt,-${formatNumber(totals.discountAmount)}\n`;
  }
  csvContent += `,,,,,,,,Gesamt netto,${formatNumber(totals.subtotalNet)}\n`;
  csvContent += `,,,,,,,,MwSt. (${VAT_RATE_PERCENT}%),${formatNumber(totals.vatAmount)}\n`;
  csvContent += `,,,,,,,,Gesamt brutto,${formatNumber(totals.totalGross)}\n`;
  
  // Create download link
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `rechnung_${invoiceNumber || 'export'}_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
