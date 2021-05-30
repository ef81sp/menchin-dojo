import { 待ちツリー, 面子候補, 聴牌 } from '../types';
import { is塔子, is単騎 } from './構成要素判定';

export const 聴牌配列生成 = (待ちツリー配列: 待ちツリー[]): 聴牌[] => {
  return 待ちツリー配列
    .map(聴牌テキスト生成)
    .flat()
    .filter(({ 手牌 }) => 手牌.length > 0);
};

const 聴牌テキスト生成 = ({ 雀頭, 順子優先, 刻子優先 }: 待ちツリー) => {
  return {
    雀頭: 雀頭 || '',
    手牌: 順子優先
      .map(面子塊 => 面子抽出(面子塊, 面子塊.面子))
      .concat(刻子優先.map(面子塊 => 面子抽出(面子塊, 面子塊.面子)))
      .flat()
      .map(手牌 =>
        手牌.split(',').sort((a: string, b: string) => {
          if (a.length > b.length) return 1;
          if (a.length < b.length) return -1;

          return a.charCodeAt(0) - b.charCodeAt(0);
        })
      )
      .filter(手牌配列 => is塔子(手牌配列[0]) || is単騎(手牌配列[0]))
      .sort((a, b) => a[0].charCodeAt(0) - b[0].charCodeAt(0))
      .map(t => t.join(','))
      .filter(
        (手牌配列, i, 手牌配列配列) => 手牌配列配列.indexOf(手牌配列) === i
      )
      .map(t => t.split(','))
  };
};

const 面子抽出 = (面子塊: 面子候補, 面子: string): string | string[] => {
  if (!面子塊.後続) {
    return `${面子},${面子塊.残り手牌.join('')}`;
  }
  return 面子塊.後続
    .map((子面子塊): [面子候補, string] => {
      return [子面子塊, `${面子},${子面子塊.面子}`];
    })
    .map(([子面子塊, 面子]) => {
      return 面子抽出(子面子塊, 面子);
    })
    .flat();
};
