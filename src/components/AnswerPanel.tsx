import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import MahjongTile from './MahjongTile';

export default function AnswerPanel({
  myAnswer,
  setMyAnswer,
}: {
  myAnswer: string[];
  setMyAnswer: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const handleAnsertChange = (
    event: React.MouseEvent<HTMLElement>,
    newAnswer: string[]
  ) => {
    setMyAnswer(newAnswer.sort());
  };
  return (
    <ToggleButtonGroup value={myAnswer} onChange={handleAnsertChange}>
      <ToggleButton value={'1'}>
        <MahjongTile num={1} suit="s" width="100%" />
      </ToggleButton>
      <ToggleButton value={'2'}>
        <MahjongTile num={2} suit="s" width="100%" />
      </ToggleButton>
      <ToggleButton value={'3'}>
        <MahjongTile num={3} suit="s" width="100%" />
      </ToggleButton>
      <ToggleButton value={'4'}>
        <MahjongTile num={4} suit="s" width="100%" />
      </ToggleButton>
      <ToggleButton value={'5'}>
        <MahjongTile num={5} suit="s" width="100%" />
      </ToggleButton>
      <ToggleButton value={'6'}>
        <MahjongTile num={6} suit="s" width="100%" />
      </ToggleButton>
      <ToggleButton value={'7'}>
        <MahjongTile num={7} suit="s" width="100%" />
      </ToggleButton>
      <ToggleButton value={'8'}>
        <MahjongTile num={8} suit="s" width="100%" />
      </ToggleButton>
      <ToggleButton value={'9'}>
        <MahjongTile num={9} suit="s" width="100%" />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
