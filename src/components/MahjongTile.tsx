import React from 'react';
import s1 from '../img/mahjongTile/s1.gif';
import s2 from '../img/mahjongTile/s2.gif';
import s3 from '../img/mahjongTile/s3.gif';
import s4 from '../img/mahjongTile/s4.gif';
import s5 from '../img/mahjongTile/s5.gif';
import s6 from '../img/mahjongTile/s6.gif';
import s7 from '../img/mahjongTile/s7.gif';
import s8 from '../img/mahjongTile/s8.gif';
import s9 from '../img/mahjongTile/s9.gif';

export default function MahjongTile({
  num,
  suit,
  width,
}: {
  num: number;
  suit: 'm' | 'p' | 's';
  width: string;
}) {
  const src = getTilePath({ num, suit });
  return <img src={src} alt={num.toString()} style={{ width }} />;
}

function getTilePath({ num, suit }: { num: number; suit: 'm' | 'p' | 's' }) {
  switch (suit) {
    case 's': {
      switch (num) {
        case 1:
          return s1;
        case 2:
          return s2;
        case 3:
          return s3;
        case 4:
          return s4;
        case 5:
          return s5;
        case 6:
          return s6;
        case 7:
          return s7;
        case 8:
          return s8;
        case 9:
          return s9;
        default:
      }
      break;
    }
    default:
  }
}
