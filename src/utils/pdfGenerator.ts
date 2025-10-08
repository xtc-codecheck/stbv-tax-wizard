import { Position, ClientData } from "@/types/stbvv";
import { calculatePosition, calculateTotal } from "./stbvvCalculator";

export const generatePDF = (
  positions: Position[], 
  documentFee: number, 
  includeVAT: boolean,
  documentType: 'quote' | 'invoice' = 'quote',
  clientData?: ClientData
) => {
  const totals = calculateTotal(positions, documentFee, includeVAT);
  const documentTitle = documentType === 'quote' ? 'Angebot' : 'Rechnung';
  const documentTitleLong = documentType === 'quote' ? 'Kostenvoranschlag' : 'Rechnung';
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>STBVV ${documentTitle}</title>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          margin: 20px; 
          color: #333;
        }
        .header { 
          text-align: center; 
          margin-bottom: 30px; 
          border-bottom: 2px solid #2563eb;
          padding-bottom: 20px;
        }
        .header h1 { 
          color: #2563eb; 
          margin: 0;
          font-size: 24px;
        }
        .header p { 
          margin: 5px 0; 
          color: #666;
        }
        .client-info {
          margin: 20px 0;
          padding: 15px;
          background-color: #f8f9fa;
          border-radius: 8px;
        }
        .client-info h3 {
          margin: 0 0 10px 0;
          color: #2563eb;
        }
        table { 
          width: 100%; 
          border-collapse: collapse; 
          margin: 20px 0; 
        }
        th, td { 
          border: 1px solid #ddd; 
          padding: 8px; 
          text-align: left; 
          font-size: 12px;
        }
        th { 
          background-color: #f8f9fa; 
          font-weight: bold;
        }
        .text-right { 
          text-align: right; 
        }
        .description {
          font-style: italic;
          color: #666;
          font-size: 11px;
        }
        .total-section { 
          margin-top: 30px; 
          padding: 20px;
          background-color: #f8f9fa;
          border-radius: 8px;
        }
        .total-row { 
          display: flex; 
          justify-content: space-between; 
          margin: 5px 0; 
        }
        .total-final { 
          font-weight: bold; 
          font-size: 18px; 
          color: #059669;
          border-top: 2px solid #059669;
          padding-top: 10px;
          margin-top: 10px;
        }
        .footer {
          margin-top: 50px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
          font-size: 12px;
          color: #666;
        }
        @media print {
          body { margin: 0; }
          .header { break-after: avoid; }
          @page {
            margin: 0;
            size: A4;
          }
          html, body {
            height: 100%;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden;
          }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>STBVV-${documentTitle}</h1>
        <p>${documentTitleLong} - Steuerberatervergütung nach StBVV 2025</p>
        <p>Erstellt am: ${new Date().toLocaleDateString('de-DE')}</p>
      </div>

      ${clientData && (clientData.name || clientData.street || clientData.postalCode || clientData.city || clientData.email) ? `
        <div class="client-info">
          <h3>Mandant:</h3>
          ${clientData.name ? `<p><strong>${clientData.name}</strong></p>` : ''}
          ${clientData.street ? `<p>${clientData.street}</p>` : ''}
          ${(clientData.postalCode || clientData.city) ? `<p>${clientData.postalCode} ${clientData.city}</p>` : ''}
          ${clientData.email ? `<p>E-Mail: ${clientData.email}</p>` : ''}
        </div>
      ` : ''}

      <table>
        <thead>
          <tr>
            <th>Pos.</th>
            <th>Tätigkeit</th>
            <th>Beschreibung</th>
            <th>Abrechnungsart</th>
            <th>Details</th>
            <th>Anzahl</th>
            <th>Gebühr</th>
            <th>Auslagen</th>
            <th class="text-right">Gesamt</th>
          </tr>
        </thead>
        <tbody>
          ${positions.map((position, index) => {
            const calc = calculatePosition(position);
            let billingDetails = '';
            
            switch (position.billingType) {
              case 'hourly':
                billingDetails = `${position.hourlyRate?.toFixed(2) || '0'} €/h × ${position.hours || '0'} h`;
                break;
              case 'flatRate':
                billingDetails = `Pauschale: ${position.flatRate?.toFixed(2) || '0'} €`;
                break;
              case 'objectValue':
              default:
                billingDetails = `${position.objectValue.toFixed(2)} € (Tab. ${position.feeTable}, ${position.tenthRate.numerator}/${position.tenthRate.denominator})`;
                break;
            }
            
            return `
              <tr>
                <td>${index + 1}</td>
                <td>${position.activity}</td>
                <td class="description">${position.description || '-'}</td>
                <td>${position.billingType === 'hourly' ? 'Stunden' : 
                      position.billingType === 'flatRate' ? 'Pauschale' : 'Gegenstandswert'}</td>
                <td>${billingDetails}</td>
                <td>${position.quantity}</td>
                <td class="text-right">${calc.adjustedFee.toFixed(2)} €</td>
                <td class="text-right">${calc.expenseFee.toFixed(2)} €</td>
                <td class="text-right">${(calc.totalNet * position.quantity).toFixed(2)} €</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>

      <div class="total-section">
        <div class="total-row">
          <span>Summe netto aller Positionen:</span>
          <span>${totals.positionsTotal.toFixed(2)} €</span>
        </div>
        <div class="total-row">
          <span>Dokumentenpauschale:</span>
          <span>${totals.documentFee.toFixed(2)} €</span>
        </div>
        <div class="total-row">
          <span>Zwischensumme netto:</span>
          <span>${totals.subtotalNet.toFixed(2)} €</span>
        </div>
        ${includeVAT ? `
          <div class="total-row">
            <span>Umsatzsteuer (19%):</span>
            <span>${totals.vatAmount.toFixed(2)} €</span>
          </div>
        ` : ''}
        <div class="total-row total-final">
          <span>Gesamtsumme brutto:</span>
          <span>${totals.totalGross.toFixed(2)} €</span>
        </div>
      </div>

      <div class="footer">
        <p><strong>Rechtsgrundlage:</strong> Steuerberatervergütungsverordnung (StBVV) in der Fassung von 2025</p>
        <p><strong>Hinweis:</strong> ${documentType === 'quote' ? 'Dieses Angebot' : 'Diese Rechnung'} wurde automatisch erstellt und entspricht den gesetzlichen Bestimmungen der StBVV.</p>
        <br>
        <p>Datum: ___________________________</p>
        <p>Unterschrift: ____________________</p>
      </div>
    </body>
    </html>
  `;

  // Create blob and download
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `stbvv-${documentType}-${new Date().toISOString().split('T')[0]}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
