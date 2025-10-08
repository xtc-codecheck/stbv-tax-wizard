import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Position, ClientData } from "@/types/stbvv";
import { calculatePosition, calculateTotal } from "./stbvvCalculator";
import { formatBillingDetails } from "./formatBillingDetails";

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
  branding?: any
) => {
  const doc = new jsPDF();
  const totals = calculateTotal(positions, documentFee, includeVAT, discount);
  const documentTitle = documentType === 'quote' ? 'Angebot' : 'Rechnung';
  
  let yPosition = 20;
  
  // Header Section
  doc.setFontSize(24);
  doc.setTextColor(37, 99, 235); // Blue
  doc.text(`STBVV-${documentTitle}`, 20, yPosition);
  
  yPosition += 10;
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('Steuerberatervergütung nach StBVV 2025', 20, yPosition);
  
  // Branding (right side)
  if (branding && branding.companyName) {
    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);
    let brandingY = 20;
    
    if (branding.companyName) {
      doc.setFont('helvetica', 'bold');
      doc.text(branding.companyName, 200, brandingY, { align: 'right' });
      brandingY += 5;
      doc.setFont('helvetica', 'normal');
    }
    if (branding.street) {
      doc.text(branding.street, 200, brandingY, { align: 'right' });
      brandingY += 4;
    }
    if (branding.postalCode || branding.city) {
      doc.text(`${branding.postalCode} ${branding.city}`.trim(), 200, brandingY, { align: 'right' });
      brandingY += 4;
    }
    if (branding.phone) {
      doc.text(`Tel: ${branding.phone}`, 200, brandingY, { align: 'right' });
      brandingY += 4;
    }
    if (branding.email) {
      doc.text(branding.email, 200, brandingY, { align: 'right' });
    }
  }
  
  yPosition += 15;
  
  // Invoice metadata (if provided)
  if (invoiceNumber || invoiceDate || servicePeriod) {
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    
    if (invoiceNumber) {
      doc.text(`${documentType === 'invoice' ? 'Rechnungs-Nr.' : 'Angebots-Nr.'}: ${invoiceNumber}`, 20, yPosition);
      yPosition += 6;
    }
    
    if (invoiceDate) {
      doc.text(`Datum: ${invoiceDate.toLocaleDateString('de-DE')}`, 20, yPosition);
      yPosition += 6;
    }
    
    if (servicePeriod) {
      doc.text(`Leistungszeitraum: ${servicePeriod}`, 20, yPosition);
      yPosition += 6;
    }
    
    yPosition += 5;
  } else {
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Erstellt am: ${new Date().toLocaleDateString('de-DE')}`, 20, yPosition);
    yPosition += 10;
  }
  
  // Client Information (if provided)
  if (clientData && (clientData.name || clientData.street || clientData.postalCode || clientData.city || clientData.email)) {
    doc.setFillColor(248, 249, 250);
    doc.rect(20, yPosition, 85, 30, 'F');
    
    doc.setFontSize(11);
    doc.setTextColor(37, 99, 235);
    doc.text('Mandant:', 25, yPosition + 7);
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    let clientYPos = yPosition + 13;
    
    if (clientData.name) {
      doc.setFont('helvetica', 'bold');
      doc.text(clientData.name, 25, clientYPos);
      clientYPos += 5;
      doc.setFont('helvetica', 'normal');
    }
    if (clientData.street) {
      doc.text(clientData.street, 25, clientYPos);
      clientYPos += 5;
    }
    if (clientData.postalCode || clientData.city) {
      doc.text(`${clientData.postalCode} ${clientData.city}`.trim(), 25, clientYPos);
      clientYPos += 5;
    }
    if (clientData.email && clientYPos < yPosition + 28) {
      doc.text(clientData.email, 25, clientYPos);
    }
    
    yPosition += 40;
  }
  
  // Positions Table
  const tableData = positions.map((position, index) => {
    const calc = calculatePosition(position);
    const billingDetails = formatBillingDetails(position);
    
    return [
      (index + 1).toString(),
      position.activity,
      position.description || '-',
      billingDetails,
      position.quantity.toString(),
      `${calc.adjustedFee.toFixed(2)} €`,
      `${calc.expenseFee.toFixed(2)} €`,
      `${(calc.totalNet * position.quantity).toFixed(2)} €`
    ];
  });
  
  autoTable(doc, {
    startY: yPosition,
    head: [['Pos.', 'Tätigkeit', 'Beschreibung', 'Details', 'Anz.', 'Gebühr', 'Auslagen', 'Gesamt']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: [248, 249, 250],
      textColor: [0, 0, 0],
      fontStyle: 'bold',
      fontSize: 9
    },
    bodyStyles: {
      fontSize: 8,
      textColor: [0, 0, 0]
    },
    columnStyles: {
      0: { cellWidth: 12 },
      1: { cellWidth: 45 },
      2: { cellWidth: 35, fontSize: 7, textColor: [100, 100, 100], fontStyle: 'italic' },
      3: { cellWidth: 40 },
      4: { cellWidth: 12, halign: 'center' },
      5: { cellWidth: 22, halign: 'right' },
      6: { cellWidth: 22, halign: 'right' },
      7: { cellWidth: 22, halign: 'right' }
    },
    margin: { left: 20, right: 20 }
  });
  
  // Total Section
  const finalY = (doc as any).lastAutoTable.finalY + 10;
  
  doc.setFillColor(248, 249, 250);
  doc.rect(20, finalY, 170, includeVAT ? 42 : 35, 'F');
  
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  
  let totalY = finalY + 8;
  
  doc.text('Summe netto aller Positionen:', 25, totalY);
  doc.text(`${totals.positionsTotal.toFixed(2)} €`, 185, totalY, { align: 'right' });
  
  totalY += 7;
  doc.text('Dokumentenpauschale:', 25, totalY);
  doc.text(`${totals.documentFee.toFixed(2)} €`, 185, totalY, { align: 'right' });
  
  if (discount && discount.value > 0) {
    totalY += 7;
    const discountLabel = discount.type === 'percentage' 
      ? `Rabatt (-${discount.value}%)` 
      : `Rabatt (-${discount.value.toFixed(2)} €)`;
    doc.setTextColor(255, 87, 34); // Orange
    doc.text(discountLabel, 25, totalY);
    doc.text(`-${totals.discountAmount.toFixed(2)} €`, 185, totalY, { align: 'right' });
    doc.setTextColor(0, 0, 0); // Reset to black
  }
  
  totalY += 7;
  doc.text('Zwischensumme netto:', 25, totalY);
  doc.text(`${totals.subtotalNet.toFixed(2)} €`, 185, totalY, { align: 'right' });
  
  if (includeVAT) {
    totalY += 7;
    doc.text('Umsatzsteuer (19%):', 25, totalY);
    doc.text(`${totals.vatAmount.toFixed(2)} €`, 185, totalY, { align: 'right' });
  }
  
  totalY += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(5, 150, 105); // Green
  doc.text('Gesamtsumme brutto:', 25, totalY);
  doc.text(`${totals.totalGross.toFixed(2)} €`, 185, totalY, { align: 'right' });
  
  // Footer
  const footerY = doc.internal.pageSize.height - 40;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  
  doc.text('Rechtsgrundlage: Steuerberatervergütungsverordnung (StBVV) in der Fassung von 2025', 20, footerY);
  doc.text(`Hinweis: ${documentType === 'quote' ? 'Dieses Angebot' : 'Diese Rechnung'} wurde automatisch erstellt und entspricht den gesetzlichen Bestimmungen der StBVV.`, 20, footerY + 5);
  
  // Branding footer (if available)
  if (branding && (branding.taxNumber || branding.bankName)) {
    let footerY2 = footerY + 10;
    doc.setFontSize(7);
    
    if (branding.taxNumber) {
      doc.text(`Steuernummer: ${branding.taxNumber}`, 20, footerY2);
      footerY2 += 3;
    }
    if (branding.bankName && branding.iban) {
      doc.text(`Bank: ${branding.bankName} | IBAN: ${branding.iban}`, 20, footerY2);
      if (branding.bic) {
        doc.text(` | BIC: ${branding.bic}`, 20, footerY2 + 3);
      }
    }
  }
  
  // Signature lines
  doc.setDrawColor(200, 200, 200);
  doc.line(20, footerY + 20, 85, footerY + 20);
  doc.line(105, footerY + 20, 190, footerY + 20);
  doc.text('Datum', 20, footerY + 25);
  doc.text('Unterschrift', 105, footerY + 25);
  
  // Save PDF
  const fileName = `stbvv-${documentType}-${invoiceNumber || new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};
