const columnNameFormatter = word => word.replace(/is_/g, '')
  .replace(/_id/g, '')
  .replace(/_number/g, '')
  .replace(/_/g, ' ')
  .replace(/(^|\s)[a-z]/g, f => f.toUpperCase());

const normalize = (dataset, inputValue, columnName = 'batting_strike_rate') => {
  const columnValues = [...dataset.map(entry => entry[columnName])];

  // Protects from a 0 - 0 denominator in *normalizedValue*
  const max = Math.max(...columnValues) === 0 ? 0.01 : Math.max(...columnValues);
  const min = Math.min(...columnValues);

  const numerator = inputValue - min;

  // Protects from a 0 - 0 denominator in *normalizedValue*
  const denominator = max - min === 0 ? 0.01 : max - min;

  const normalizedValue = numerator / denominator;

  const customRange = 0.9 - 0.1;
  const scaledNormalizedValue = (normalizedValue * customRange) + 0.1;
  return scaledNormalizedValue;
};

const randomArraySelection = array => array[Math.floor(Math.random() * array.length)];

const capitalCase = word => word.replace(/_/g, ' ')
  .replace(/(^|\s)[a-z]/g, f => f.toUpperCase());

const round = (number, precision) => {
  const factor = 10 ** precision;
  const tempNumber = number * factor;
  const roundedTempNumber = Math.round(tempNumber);
  return roundedTempNumber / factor;
};

const urlBuilder = ({ urlElements, excludeKeys = [] } = {}) => {
  const urlString = Object.values(Object.entries(urlElements)
    .filter(([key]) => !excludeKeys.includes(key))
    .reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {}))
    .join('&');
  return encodeURI(urlString);
};

export {
  columnNameFormatter, normalize,
  randomArraySelection, capitalCase,
  round, urlBuilder };
