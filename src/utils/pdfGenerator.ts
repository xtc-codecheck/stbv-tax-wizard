
import { Position } from "@/types/stbvv";
import { calculatePosition, calculateTotal } from "./stbvvCalculator";

export const generatePDF = (
  positions: Position[], 
  documentFee: number, 
  includeVAT: boolean
) => {
  const totals = calculateTotal(positions, documentFee, includeVAT);
  
  // Create a simple HTML structure for the PDF
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>STBVV Abrechnung</title>
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
        table { 
          width: 100%; 
          border-collapse: collapse; 
          margin: 20px 0; 
        }
        th, td { 
          border: 1px solid #ddd; 
          padding: 8px; 
          text-align: left; 
        }
        th { 
          background-color: #f8f9fa; 
          font-weight: bold;
        }
        .text-right { 
          text-align: right; 
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
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🧾 STBVV-Abrechnung</h1>
        <p>Steuerberatervergütung nach StBVV 2025</p>
        <p>Erstellt am: ${new Date().toLocaleDateString('de-DE')}</p>
      </div>

      <table>
        <thead>
          <tr>
            <th>Pos.</th>
            <th>Tätigkeit</th>
            <th>Gegenstandswert</th>
            <th>Tabelle</th>
            <th>Zehntelsatz</th>
            <th>Anzahl</th>
            <th>Gebühr</th>
            <th>Auslagen</th>
            <th class="text-right">Gesamt</th>
          </tr>
        </thead>
        <tbody>
          ${positions.map((position, index) => {
            const calc = calculatePosition(position);
            return `
              <tr>
                <td>${index + 1}</td>
                <td>${position.activity}</td>
                <td class="text-right">${position.objectValue.toFixed(2)} €</td>
                <td>${position.feeTable}</td>
                <td>${position.tenthRate.numerator}/${position.tenthRate.denominator}</td>
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
          <span>💰 Gesamtsumme brutto:</span>
          <span>${totals.totalGross.toFixed(2)} €</span>
        </div>
      </div>

      <div class="footer">
        <p><strong>Rechtsgrundlage:</strong> Steuerberatervergütungsverordnung (StBVV) in der Fassung von 2025</p>
        <p><strong>Hinweis:</strong> Diese Abrechnung wurde automatisch erstellt und entspricht den gesetzlichen Bestimmungen der StBVV.</p>
        <br>
        <p>Mandant: _________________________</p>
        <p>Datum: ___________________________</p>
        <p>Unterschrift: ____________________</p>
      </div>
    </body>
    </html>
  `;

  // Create and download the PDF
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Wait for content to load, then print
    setTimeout(() => {
      printWindow.print();
    }, 500);
  }
};
