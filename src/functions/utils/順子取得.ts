import { 牌, 手牌, 面子候補 } from '../types';

const 順子一覧: {
  [key: string]: 牌[];
} = {
  '1': ['2', '3'],
  '2': ['3', '4'],
  '3': ['4', '5'],
  '4': ['5', '6'],
  '5': ['6', '7'],
  '6': ['7', '8'],
  '7': ['8', '9'],
  '8': [],
  '9': []
};

export const 順子取得 = (手牌: 手牌, i: number): 面子候補 => {
  const 手牌コピー = 手牌.slice();
  const 起点牌: 牌 = 手牌コピー[i];
  const 今回の順子 = 順子一覧[起点牌];

  // 今回の順子が構成できなければスキップ
  if (
    !(手牌コピー.includes(今回の順子[0]) && 手牌コピー.includes(今回の順子[1]))
  )
    return {
      面子: '',
      残り手牌: 手牌コピー
    };

  手牌コピー.splice(手牌コピー.indexOf(起点牌), 1);
  手牌コピー.splice(手牌コピー.indexOf(今回の順子[0]), 1);
  手牌コピー.splice(手牌コピー.indexOf(今回の順子[1]), 1);
  return {
    面子: 起点牌 + 今回の順子.join(''),
    残り手牌: 手牌コピー
  };
};
