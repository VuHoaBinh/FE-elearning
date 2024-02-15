const formatCharacter = {
  numberLocale: (number?: number, unit_name: string = "") => {
    if (!number) return 0;
    return number.toLocaleString() + unit_name;
  },
  numberRound: (number?: number) => {
    if (!number) return 0;
    return Math.ceil(number);
    // return number.toString().substring(0, 5);
  },
  convertIntoMB: (size: number) => Math.floor(size / Math.pow(1024, 2)),
};

export default formatCharacter;
