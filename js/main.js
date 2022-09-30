const isCorrectRange = (from, to) => from >= 0 && to >= 0;

const getRandomIntInclusive = (from, to) => {
  if(!isCorrectRange(from, to)) {
    return NaN;
  }

  if(from > to) {
    [from, to] = [to, from];
  }

  from = Math.ceil(from);
  to = Math.floor(to);

  return Math.floor(Math.random() * (to - from + 1) + from);
};

const getRandomFloatInclusive = (from, to, decimals = 0) => {
  if(!isCorrectRange(from, to)) {
    return NaN;
  }

  if(from > to) {
    [from, to] = [to, from];
  }

  return parseFloat((Math.random() * (from - to) + to).toFixed(decimals));
};

getRandomIntInclusive(1,5);
getRandomFloatInclusive(1.2, 1.4, 4);
