export const format2Money = n => n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');

export default format2Money;
