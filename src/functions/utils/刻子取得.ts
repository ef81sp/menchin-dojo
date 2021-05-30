import { 手牌, 面子候補 } from '../types';
import { is刻子 } from './構成要素判定';

export const 刻子取得 = (手牌: 手牌, i: number): 面子候補 => {
  const 手牌コピー = 手牌.slice();
  const 切り出し牌 = 手牌コピー.splice(i, 3).join('');

  if (!is刻子(切り出し牌))
    return {
      面子: '',
      残り手牌: 手牌コピー
    };

  return {
    面子: 切り出し牌,
    残り手牌: 手牌コピー
  };
};
