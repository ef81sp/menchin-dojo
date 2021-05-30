import { 手牌 } from '../types';
import { is対子 } from './構成要素判定';

export const 対子取得 = (手牌: 手牌, i: number) => {
  const 手牌コピー = 手牌.slice();
  const 切り出し牌 = 手牌コピー.splice(i, 2).join('');

  if (!is対子(切り出し牌))
    return {
      対子: '',
      残り手牌: 手牌コピー
    };

  return {
    対子: 切り出し牌,
    残り手牌: 手牌コピー
  };
};
