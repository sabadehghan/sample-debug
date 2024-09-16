const convertEnNumberToFaNumber = (number: number) => {
  return number ? number.toLocaleString('fa-IR', { useGrouping: false }) : '-';
};

export default convertEnNumberToFaNumber;
