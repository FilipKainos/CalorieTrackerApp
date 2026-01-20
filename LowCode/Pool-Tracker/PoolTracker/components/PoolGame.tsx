import * as React from 'react';
import './PoolGame.css';

interface Ball {
  number: number;
  type: 'solid' | 'stripe' | 'eight';
  color: string;
  pocketed: boolean;
}

export interface IPoolGameProps {
  gameStateChanged?: (state: string) => void;
  onPlayChess?: () => void;
}

export const PoolGame: React.FunctionComponent<IPoolGameProps> = (props) => {
  const [balls, setBalls] = React.useState<Ball[]>([
    { number: 1, type: 'solid', color: '#FFD700', pocketed: false },
    { number: 2, type: 'solid', color: '#0066CC', pocketed: false },
    { number: 3, type: 'solid', color: '#CC0000', pocketed: false },
    { number: 4, type: 'solid', color: '#663399', pocketed: false },
    { number: 5, type: 'solid', color: '#FF6600', pocketed: false },
    { number: 6, type: 'solid', color: '#006633', pocketed: false },
    { number: 7, type: 'solid', color: '#990000', pocketed: false },
    { number: 8, type: 'eight', color: '#000000', pocketed: false },
    { number: 9, type: 'stripe', color: '#FFD700', pocketed: false },
    { number: 10, type: 'stripe', color: '#0066CC', pocketed: false },
    { number: 11, type: 'stripe', color: '#CC0000', pocketed: false },
    { number: 12, type: 'stripe', color: '#663399', pocketed: false },
    { number: 13, type: 'stripe', color: '#FF6600', pocketed: false },
    { number: 14, type: 'stripe', color: '#006633', pocketed: false },
    { number: 15, type: 'stripe', color: '#990000', pocketed: false },
  ]);

  const [currentPlayer, setCurrentPlayer] = React.useState<'Player 1' | 'Player 2'>('Player 1');
  const [player1Type, setPlayer1Type] = React.useState<'solid' | 'stripe' | null>(null);
  const [player2Type, setPlayer2Type] = React.useState<'solid' | 'stripe' | null>(null);
  const [winner, setWinner] = React.useState<string | null>(null);
  const [gameOver, setGameOver] = React.useState(false);

  const checkWinCondition = (updatedBalls: Ball[], playerType: 'solid' | 'stripe' | null, playerName: string) => {
    if (!playerType) return;

    const playerBalls = updatedBalls.filter(b => b.type === playerType);
    const allPlayerBallsPocketed = playerBalls.every(b => b.pocketed);
    const eightBallPocketed = updatedBalls.find(b => b.number === 8)?.pocketed;

    if (eightBallPocketed) {
      if (allPlayerBallsPocketed) {
        // Player wins!
        setWinner(playerName);
        setGameOver(true);
      } else {
        // Player loses by pocketing 8-ball early
        const otherPlayer = playerName === 'Player 1' ? 'Player 2' : 'Player 1';
        setWinner(otherPlayer);
        setGameOver(true);
      }
    }
  };

  const toggleBall = (ballNumber: number) => {
    if (gameOver) return;

    const newBalls = balls.map(ball => {
      if (ball.number === ballNumber) {
        return { ...ball, pocketed: !ball.pocketed };
      }
      return ball;
    });
    setBalls(newBalls);

    // Assign player types based on first ball pocketed
    const pocketedBall = newBalls.find(b => b.number === ballNumber);
    if (pocketedBall && pocketedBall.pocketed && pocketedBall.type !== 'eight') {
      if (!player1Type && !player2Type) {
        if (currentPlayer === 'Player 1') {
          setPlayer1Type(pocketedBall.type);
          setPlayer2Type(pocketedBall.type === 'solid' ? 'stripe' : 'solid');
        } else {
          setPlayer2Type(pocketedBall.type);
          setPlayer1Type(pocketedBall.type === 'solid' ? 'stripe' : 'solid');
        }
      }
    }

    // Check win condition after update
    setTimeout(() => {
      if (currentPlayer === 'Player 1') {
        checkWinCondition(newBalls, player1Type, 'Player 1');
      } else {
        checkWinCondition(newBalls, player2Type, 'Player 2');
      }
    }, 100);
  };

  const switchPlayer = () => {
    setCurrentPlayer(currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1');
  };

  const resetGame = () => {
    setBalls(balls.map(ball => ({ ...ball, pocketed: false })));
    setPlayer1Type(null);
    setPlayer2Type(null);
    setCurrentPlayer('Player 1');
    setWinner(null);
    setGameOver(false);
  };

  const solids = balls.filter(b => b.type === 'solid');
  const stripes = balls.filter(b => b.type === 'stripe');
  const eightBall = balls.find(b => b.type === 'eight');

  const player1Balls = player1Type ? balls.filter(b => b.type === player1Type) : [];
  const player2Balls = player2Type ? balls.filter(b => b.type === player2Type) : [];

  return (
    <div className="pool-tracker">
      <div className="header">
        <h2>🎱 8-Ball Pool Tracker</h2>
        <div className="header-buttons">
          <button onClick={props.onPlayChess} className="chess-btn">♟️ Play Chess</button>
          <button onClick={resetGame} className="reset-btn">Reset Game</button>
        </div>
      </div>

      {gameOver && winner && (
        <div className="winner-banner">
          <h1>🏆 {winner} WINS! 🏆</h1>
          <p>Click Reset Game to start a new game</p>
        </div>
      )}

      <div className="game-info">
        <div className="player-info">
          <div className={`player ${currentPlayer === 'Player 1' ? 'active' : ''}`}>
            <h3>Player 1 {currentPlayer === 'Player 1' && '👈'}</h3>
            <p>{player1Type ? `${player1Type.toUpperCase()}S` : 'Not Assigned'}</p>
            <p>Remaining: {player1Balls.filter(b => !b.pocketed).length}</p>
          </div>
          <button onClick={switchPlayer} className="switch-btn">Switch Turn</button>
          <div className={`player ${currentPlayer === 'Player 2' ? 'active' : ''}`}>
            <h3>Player 2 {currentPlayer === 'Player 2' && '👈'}</h3>
            <p>{player2Type ? `${player2Type.toUpperCase()}S` : 'Not Assigned'}</p>
            <p>Remaining: {player2Balls.filter(b => !b.pocketed).length}</p>
          </div>
        </div>
      </div>

      <div className="balls-section">
        <div className="ball-group">
          <h3>Solids (1-7)</h3>
          <div className="balls-grid">
            {solids.map(ball => (
              <div
                key={ball.number}
                className={`ball ${ball.pocketed ? 'pocketed' : ''}`}
                style={{ backgroundColor: ball.color }}
                onClick={() => toggleBall(ball.number)}
              >
                <span className="ball-number">{ball.number}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="ball-group eight-ball-group">
          <h3>8-Ball</h3>
          <div className="balls-grid">
            <div
              className={`ball ${eightBall?.pocketed ? 'pocketed' : ''}`}
              style={{ backgroundColor: '#000000' }}
              onClick={() => toggleBall(8)}
            >
              <span className="ball-number" style={{ color: 'white' }}>8</span>
            </div>
          </div>
        </div>

        <div className="ball-group">
          <h3>Stripes (9-15)</h3>
          <div className="balls-grid">
            {stripes.map(ball => (
              <div
                key={ball.number}
                className={`ball stripe ${ball.pocketed ? 'pocketed' : ''}`}
                style={{ backgroundColor: ball.color }}
                onClick={() => toggleBall(ball.number)}
              >
                <span className="ball-number">{ball.number}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
