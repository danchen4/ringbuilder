const formatter = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD',
});

export const formatCurrency = (num: number) => {
  return formatter.format(num);
};
