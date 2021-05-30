export const is対子 = (候補: string | string[]) => {
  if (候補.length !== 2) return false;
  return 候補[0] === 候補[1];
};

export const is順子 = (候補: string | string[]) => {
  if (候補.length !== 3) return false;
  return (
    Number(候補[2]) - Number(候補[1]) === 1 &&
    Number(候補[1]) - Number(候補[0]) === 1
  );
};

export const is刻子 = (候補: string | string[]) => {
  if (候補.length !== 3) return false;
  return 候補[0] === 候補[1] && 候補[1] === 候補[2];
};

export const is面子 = (候補: string | string[]) => {
  if (候補.length !== 3) return false;
  return is順子(候補) || is刻子(候補);
};

export const is単騎 = (候補: string | string[]) => {
  return 候補.length === 1;
};

export const is塔子 = (候補: string | string[]) => {
  return is両面(候補) || is嵌張(候補) || is辺張(候補) || is対子(候補);
};

export const is両面 = (候補: string | string[]) => {
  if (候補.length !== 2) return false;
  if (候補.includes('1') || 候補.includes('9')) return false;
  return Number(候補[1]) - Number(候補[0]) === 1;
};

export const is嵌張 = (候補: string | string[]) => {
  if (候補.length !== 2) return false;
  return Number(候補[1]) - Number(候補[0]) === 2;
};

export const is辺張 = (候補: string | string[]) => {
  if (候補.length !== 2) return false;
  return 候補 === '12' || 候補 === '89';
};
