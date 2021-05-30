import * as utils from './utils';
import { 手牌, 雀頭候補, 面子候補 } from './types';

const 待ち = (手牌: string | 手牌 = '1112345678999') => {
  if (![1, 4, 7, 10, 13].includes(手牌.length)) return [];
  const arrayA: 手牌 =
    typeof 手牌 === 'string' ? (手牌.split('') as 手牌) : 手牌;
  const 雀頭候補一覧 = 雀頭候補取得(arrayA);
  // 単騎待ち
  雀頭候補一覧.push({ 対子: '', 残り手牌: arrayA });

  const 待ちツリー = 雀頭候補一覧.map((雀頭候補) => {
    const 順子ベース一覧 = 順子一覧取得(雀頭候補.残り手牌);
    const 刻子ベース一覧 = 刻子一覧取得(雀頭候補.残り手牌);
    return {
      雀頭: 雀頭候補.対子,
      順子優先: 順子ベース一覧,
      刻子優先: 刻子ベース一覧,
    };
  });
  const 聴牌 = utils.聴牌配列生成(待ちツリー);
  const 待ち詳細 = 聴牌.map(utils.待ち判定).flat();
  const 待ち = [...new Set(待ち詳細.map(({ 待ち }) => 待ち).flat())].sort();
  return 待ち;
};

const 雀頭候補取得 = (手牌: 手牌) => {
  const 候補一覧: 雀頭候補[] = [];
  for (let i = 0; i < 手牌.length - 1; i++) {
    const 取得結果 = utils.対子取得(手牌, i);
    // 対子が構成できなければスキップ
    if (!取得結果.対子) continue;
    if (候補一覧.find((候補) => 候補.対子 === 取得結果.対子)) continue; // 同じ対子は追加しない

    候補一覧.push(取得結果);
  }
  return 候補一覧;
};
const 刻子一覧取得 = (手牌: 手牌) => {
  const 候補一覧: 面子候補[] = [];
  for (let i = 0; i < 手牌.length - 1; i++) {
    const 取得結果 = utils.刻子取得(手牌, i);

    // 今回の順子が構成できなければスキップ
    if (!取得結果.面子) continue;
    // 同じ刻子は追加しない
    if (候補一覧.find((候補) => 候補.面子 === 取得結果.面子)) continue;

    if (取得結果.残り手牌.length >= 4) {
      取得結果.後続 = [
        刻子一覧取得(取得結果.残り手牌),
        順子一覧取得(取得結果.残り手牌),
      ].flat();
    }

    候補一覧.push(取得結果);
  }
  return 候補一覧;
};

const 順子一覧取得 = (手牌: 手牌) => {
  const 候補一覧: 面子候補[] = [];
  for (let i = 0; i < 手牌.length - 2; i++) {
    const 取得結果 = utils.順子取得(手牌, i);

    // 今回の順子が構成できなければスキップ
    if (!取得結果.面子) continue;
    // 同じ順子は追加しない
    if (候補一覧.find((候補) => 候補.面子 === 取得結果.面子)) continue;

    if (取得結果.残り手牌.length >= 4) {
      取得結果.後続 = [
        刻子一覧取得(取得結果.残り手牌),
        順子一覧取得(取得結果.残り手牌),
      ].flat();
    }

    候補一覧.push(取得結果);
  }
  return 候補一覧;
};

export default 待ち;
console.log(待ち(process.argv[2]));
