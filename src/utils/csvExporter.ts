import { Position, BrandingSettings } from "@/types/stbvv";
import { calculatePosition } from "@/utils/stbvvCalculator";

interface ExportData {
  positions: Position[];
  totals: {
    totalNet: number;
    totalVat: number;
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
  
  // CSV Header
  let csvContent = "data:text/csv;charset=utf-8,";
  
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
    const objectValue = pos.objectValue?.toFixed(2) || "";
    const hours = pos.hours?.toFixed(2) || "";
    const hourlyRate = pos.hourlyRate?.toFixed(2) || "";
    const flatRate = pos.flatRate?.toFixed(2) || "";
    
    // Calculate totals for this position
    const calculation = calculatePosition(pos);
    const totalNet = calculation.totalNet.toFixed(2);
    const totalVat = (calculation.totalNet * 0.19).toFixed(2);
    const totalGross = (calculation.totalNet * 1.19).toFixed(2);
    
    const description = pos.description?.replace(/,/g, ";").replace(/\n/g, " ") || "";
    const activity = pos.activity?.replace(/,/g, ";") || "";
    
    csvContent += `${index + 1},${activity},${description},${pos.billingType},${objectValue},${hours},${hourlyRate},${flatRate},${totalNet},${totalVat},${totalGross}\n`;
  });
  
  // Totals
  csvContent += "\n";
  csvContent += `,,,,,,,,Gesamt netto,${totals.totalNet.toFixed(2)}\n`;
  csvContent += `,,,,,,,,MwSt. (19%),${totals.totalVat.toFixed(2)}\n`;
  csvContent += `,,,,,,,,Gesamt brutto,${totals.totalGross.toFixed(2)}\n`;
  
  // Create download link
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `rechnung_${invoiceNumber || 'export'}_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
