
const dollarFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
/**
 * format number in $10.00 pattern
 */
export const formatCurrency = dollarFormat.format;
