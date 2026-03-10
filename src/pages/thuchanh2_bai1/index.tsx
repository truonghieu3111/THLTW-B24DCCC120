import { useState } from 'react';
import GameControl from './gameControl';
import GameHistory from './gameHistory';
import { getComputerChoice, getResult } from './gameLogic';

export default function thuchanh2_bai1() {

  const [history, setHistory] = useState<any[]>([]);

  const playGame = (player: string) => {

    const computer = getComputerChoice();
    const result = getResult(player, computer);

    const newGame = {
      id: Date.now(),
      player,
      computer,
      result
    };

    setHistory([newGame, ...history]);
  };

  return (
    <div>

      <h2>Trò chơi Oẳn Tù Tì</h2>

      <GameControl onSelect={playGame} />

      <GameHistory history={history} />

    </div>
  );
}