import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';

import MahjongTile from './MahjongTile';

import machi from '../functions/machi';
import AnswerPanel from './AnswerPanel';
import Alert from '@material-ui/lab/Alert';

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max - 1)) + 1;
}

const useStyles = makeStyles({
  tiles: {
    width: '100%',
  },
  controler: {
    margin: '1em',
  },
});

const tileNumRangeMaster = {
  easy: '1to9',
  normal: '2to8',
  hard: '3to7',
};

function getTileWidth(tilesLength: number) {
  const tileWidthPx = 47;
  const windowWidth = window.innerWidth * 0.8;
  return tileWidthPx > windowWidth / tilesLength
    ? `${100 / tilesLength}%`
    : 'auto';
}

export default function MahjongClosedFlash() {
  const classes = useStyles();
  const defaultTileNums = [1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9];
  const [tileNums, setTileNums] = useState(defaultTileNums);
  const [tilesLength, setTilesLength] = useState(13);
  const [isSort, setIsSort] = useState(true);
  const [tileNumRange, setTileNumRange] = useState(tileNumRangeMaster.easy);
  const [answer, setAnswer] = useState(machi(defaultTileNums.join('')));
  const [myAnswer, setMyAnswer] = useState<string[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);

  const reload = (length?: number, range?: string) => {
    setShowAnswer(false);
    let tileNums = getTileNums(
      length || tilesLength,
      range || tileNumRange
    ).sort();
    let _answer = machi(tileNums.join(''));
    while (!_answer.length) {
      tileNums = getTileNums(
        length || tilesLength,
        range || tileNumRange
      ).sort();
      _answer = machi(tileNums.join(''));
    }
    setTileNums(tileNums);
    setAnswer(_answer);
    setMyAnswer([]);
  };
  return (
    <div>
      <div className={classes.tiles}>
        {(isSort ? [...tileNums].sort() : tileNums).map((n, i) => (
          <MahjongTile
            num={n}
            suit="s"
            key={i}
            width={getTileWidth(13)}
          />
        ))}
      </div>

      <div className={classes.controler}>
        <Button variant="contained" color="primary" onClick={() => reload()}>
          リロード
        </Button>

        <Grid className={classes.controler} container spacing={5}>
          <div>
            <FormLabel component="legend">枚数</FormLabel>
            <RadioGroup
              aria-label="枚数"
              value={tilesLength}
              onChange={(e, v) => {
                const length = parseInt(v);
                setTilesLength(length);
                reload(length);
              }}
            >
              <FormControlLabel value={7} control={<Radio />} label="7枚" />
              <FormControlLabel value={10} control={<Radio />} label="10枚" />
              <FormControlLabel value={13} control={<Radio />} label="13枚" />
            </RadioGroup>
          </div>

          {/* <div>
            <FormLabel component="legend">理牌</FormLabel>
            <RadioGroup
              aria-label="理牌"
              value={isSort}
              onChange={(e, v) => {
                setIsSort(v === 'true');
              }}
            >
              <FormControlLabel value={true} control={<Radio />} label="する" />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="しない"
              />
            </RadioGroup>
          </div> */}

          <div>
            <FormLabel component="legend">牌の範囲</FormLabel>
            <RadioGroup
              aria-label="タンヤオ"
              value={tileNumRange}
              onChange={(e, v) => {
                setTileNumRange(v);
                reload(undefined, v);
              }}
            >
              <FormControlLabel
                value={tileNumRangeMaster.easy}
                control={<Radio />}
                label="1 - 9"
              />
              <FormControlLabel
                value={tileNumRangeMaster.normal}
                control={<Radio />}
                label="2 - 8"
              />
              <FormControlLabel
                value={tileNumRangeMaster.hard}
                control={<Radio />}
                label="3 - 7"
              />
            </RadioGroup>
          </div>
        </Grid>
      </div>
      <div>
        <AnswerPanel myAnswer={myAnswer} setMyAnswer={setMyAnswer} />
      </div>
      <div className={classes.controler}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowAnswer(true)}
        >
          判定
        </Button>
      </div>
      {showAnswer && (
        <div>
          {answer.join() === myAnswer.join() ? (
            <Alert severity="success">せいかい</Alert>
          ) : (
            <Alert severity="error">ざんねん</Alert>
          )}
          <p>
            {`正解: ${answer.join()}`}
            <br />
            {`あなたの回答: ${myAnswer.join()}`}
          </p>
        </div>
      )}
    </div>
  );
}

function getTileNums(length: number, fromTo: string) {
  // prettier-ignore
  const seed = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
  ];

  const result = [];
  if (fromTo === '2to8') {
    seed.splice(0, 4);
    seed.splice(-4, 4);
  } else if (fromTo === '3to7') {
    seed.splice(0, 8);
    seed.splice(-8, 8);
  }
  for (let i = 0; i < length; i++) {
    result.push(
      Math.ceil(seed.splice(getRandomInt(seed.length) - 1, 1)[0] / 4)
    );
  }

  return result;
}
