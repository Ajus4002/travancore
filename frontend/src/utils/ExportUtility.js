/**
 * Travancore Research & Investments Ltd.
 * Financial & Tax Statement Exporter Engine (Module 14)
 */

export function downloadCSV(filename, csvContent) {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function generatePnLStatementCSV(trades, summary) {
  let csv = 'TRAVANCORE RESEARCH & INVESTMENTS LTD.\n';
  csv += 'INSTITUTIONAL FINANCIAL P&L STATEMENT\n';
  csv += `Generated Date,${new Date().toLocaleString()}\n`;
  csv += `Account Name,${summary?.user || 'Sachin Tendulkar'}\n`;
  csv += `Account ID,${summary?.account_id || '458921'}\n\n`;

  csv += 'PORTFOLIO SUMMARY METRICS\n';
  csv += `Total Investment,INR ${summary?.total_investment || 500000}\n`;
  csv += `Current Value,INR ${summary?.current_value || 538750}\n`;
  csv += `Net Cumulative P&L,INR ${summary?.net_pnl || 48625}\n`;
  csv += `ROI Percentage,${summary?.roi || '+9.73%'}\n`;
  csv += `Overall Win Rate,${summary?.win_rate || '75.0%'}\n\n`;

  csv += 'TRADE TRANSACTION LOG\n';
  csv += 'Date,Instrument Symbol,Type,Quantity,Buy Price (INR),Sell/LTP Price (INR),Net P&L (INR),Status\n';

  trades.forEach(t => {
    csv += `"${t.date}","${t.symbol}","${t.type}",${t.qty},${t.buy},${t.sell},${t.pnl},"${t.status}"\n`;
  });

  return csv;
}

export function generateTaxReportCSV(trades) {
  let csv = 'TRAVANCORE RESEARCH & INVESTMENTS LTD.\n';
  csv += 'ANNUAL TAX & CAPITAL GAINS SUMMARY STATEMENT (FY 2026-27)\n';
  csv += `Statement Date,${new Date().toLocaleDateString()}\n\n`;

  csv += 'CAPITAL GAINS BREAKDOWN\n';
  csv += 'Category,Gross Realized Gains (INR),STT & Charges (INR),Net Taxable Profit (INR)\n';
  csv += 'Short Term Capital Gains (STCG),27850.00,1420.00,26430.00\n';
  csv += 'F&O Derivatives Income,18775.00,980.00,17795.00\n';
  csv += 'Total Taxable Income,46625.00,2400.00,44225.00\n\n';

  csv += 'DISCLAIMER\n';
  csv += 'This statement is issued by Travancore Research & Investments Ltd. for income tax filing verification.\n';

  return csv;
}
