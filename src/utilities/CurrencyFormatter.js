const convertToRupeesText = (amount) => {
  const currencyFormat = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  });
  return currencyFormat.format(amount);
};

export default {
  convertToRupeesText,
};
