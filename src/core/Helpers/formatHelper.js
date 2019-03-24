export const format2Money = n => n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');

export const decapitalizeFirstLetter = str => (
  str.length > 0 ? str.charAt(0).toLowerCase() + str.slice(1) : str
);

export default format2Money;
