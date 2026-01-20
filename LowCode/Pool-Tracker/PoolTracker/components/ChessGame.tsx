import * as React from 'react';
import './ChessGame.css';

type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
type Player = 'white' | 'black';

interface Piece {
  type: PieceType;
  player: Player;
  hasMoved?: boolean;
  enPassantVulnerable?: boolean;
}

interface Position {
  row: number;
  col: number;
}

interface GameState {
  lastMove?: { from: Position; to: Position };
}

export interface IChessGameProps {
  onBack?: () => void;
}

const ChessSettings: React.FunctionComponent<{
  onStartGame: (playerColor: Player, botRating: number) => void;
  onBack?: () => void;
}> = ({ onStartGame, onBack }) => {
  const [playerColor, setPlayerColor] = React.useState<'white' | 'black' | 'random'>('white');
  const [botRating, setBotRating] = React.useState(1500);

  const handleStart = () => {
    const finalColor = playerColor === 'random' 
      ? (Math.random() > 0.5 ? 'white' : 'black')
      : playerColor;
    onStartGame(finalColor as Player, botRating);
  };

  return (
    <div className="chess-settings">
      <div className="chess-header">
        <button onClick={onBack} className="back-btn">← Back to Pool</button>
        <h2>♟️ Chess Settings</h2>
        <div></div>
      </div>

      <div className="settings-container">
        <div className="setting-group">
          <h3>Choose Your Color</h3>
          <div className="color-buttons">
            <button 
              className={`color-btn ${playerColor === 'white' ? 'active' : ''}`}
              onClick={() => setPlayerColor('white')}
            >
              ♔ White
            </button>
            <button 
              className={`color-btn ${playerColor === 'black' ? 'active' : ''}`}
              onClick={() => setPlayerColor('black')}
            >
              ♚ Black
            </button>
            <button 
              className={`color-btn ${playerColor === 'random' ? 'active' : ''}`}
              onClick={() => setPlayerColor('random')}
            >
              🎲 Random
            </button>
          </div>
        </div>

        <div className="setting-group">
          <h3>Bot Rating: {botRating}</h3>
          <input 
            type="range" 
            min="1000" 
            max="2500" 
            step="100"
            value={botRating}
            onChange={(e) => setBotRating(Number(e.target.value))}
            className="rating-slider"
          />
          <div className="rating-labels">
            <span>1000</span>
            <span>1500</span>
            <span>2000</span>
            <span>2500</span>
          </div>
        </div>

        <button className="start-game-btn" onClick={handleStart}>
          Start Game
        </button>
      </div>
    </div>
  );
};

const initialBoard = (): (Piece | null)[][] => {
  const board: (Piece | null)[][] = Array(8).fill(null).map(() => Array(8).fill(null));
  
  // Black pieces
  board[0] = [
    { type: 'rook', player: 'black' },
    { type: 'knight', player: 'black' },
    { type: 'bishop', player: 'black' },
    { type: 'queen', player: 'black' },
    { type: 'king', player: 'black' },
    { type: 'bishop', player: 'black' },
    { type: 'knight', player: 'black' },
    { type: 'rook', player: 'black' }
  ];
  for (let i = 0; i < 8; i++) {
    board[1][i] = { type: 'pawn', player: 'black' };
  }
  
  // White pieces
  for (let i = 0; i < 8; i++) {
    board[6][i] = { type: 'pawn', player: 'white' };
  }
  board[7] = [
    { type: 'rook', player: 'white' },
    { type: 'knight', player: 'white' },
    { type: 'bishop', player: 'white' },
    { type: 'queen', player: 'white' },
    { type: 'king', player: 'white' },
    { type: 'bishop', player: 'white' },
    { type: 'knight', player: 'white' },
    { type: 'rook', player: 'white' }
  ];
  
  return board;
};

const pieceSymbols: Record<PieceType, Record<Player, string>> = {
  pawn: { white: '♙', black: '♟' },
  rook: { white: '♖', black: '♜' },
  knight: { white: '♘', black: '♞' },
  bishop: { white: '♗', black: '♝' },
  queen: { white: '♕', black: '♛' },
  king: { white: '♔', black: '♚' }
};

export const ChessGame: React.FunctionComponent<IChessGameProps> = (props) => {
  const [gameStarted, setGameStarted] = React.useState(false);
  const [playerColor, setPlayerColor] = React.useState<Player>('white');
  const [botRating, setBotRating] = React.useState(1500);

  const handleStartGame = (color: Player, rating: number) => {
    setPlayerColor(color);
    setBotRating(rating);
    setGameStarted(true);
  };

  const handleBackToSettings = () => {
    setGameStarted(false);
  };

  if (!gameStarted) {
    return <ChessSettings onStartGame={handleStartGame} onBack={props.onBack} />;
  }

  return <ChessGameBoard 
    playerColor={playerColor} 
    botRating={botRating} 
    onBack={handleBackToSettings}
  />;
};

const ChessGameBoard: React.FunctionComponent<{
  playerColor: Player;
  botRating: number;
  onBack: () => void;
}> = ({ playerColor, botRating, onBack }) => {
  const [board, setBoard] = React.useState<(Piece | null)[][]>(initialBoard());
  const [selectedPos, setSelectedPos] = React.useState<Position | null>(null);
  const [currentPlayer, setCurrentPlayer] = React.useState<Player>('white');
  const [validMoves, setValidMoves] = React.useState<Position[]>([]);
  const [gameOver, setGameOver] = React.useState(false);
  const [winner, setWinner] = React.useState<string | null>(null);
  const [gameState, setGameState] = React.useState<GameState>({});
  const [whiteInCheck, setWhiteInCheck] = React.useState(false);
  const [blackInCheck, setBlackInCheck] = React.useState(false);

  React.useEffect(() => {
    if (playerColor === 'black' && currentPlayer === 'white' && !gameOver) {
      setTimeout(() => makeBotMove(board), 500);
    }
  }, []);


  const findKing = (player: Player, currentBoard: (Piece | null)[][]): Position | null => {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = currentBoard[row][col];
        if (piece && piece.type === 'king' && piece.player === player) {
          return { row, col };
        }
      }
    }
    return null;
  };

  const isSquareUnderAttack = (pos: Position, byPlayer: Player, currentBoard: (Piece | null)[][]): boolean => {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = currentBoard[row][col];
        if (piece && piece.player === byPlayer) {
          if (canPieceAttack({ row, col }, pos, piece, currentBoard)) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const canPieceAttack = (from: Position, to: Position, piece: Piece, currentBoard: (Piece | null)[][]): boolean => {
    const rowDiff = to.row - from.row;
    const colDiff = to.col - from.col;

    switch (piece.type) {
      case 'pawn':
        const direction = piece.player === 'white' ? -1 : 1;
        return Math.abs(colDiff) === 1 && rowDiff === direction;

      case 'rook':
        return (rowDiff === 0 || colDiff === 0) && isPathClearForBot(from, to, currentBoard);

      case 'knight':
        return (Math.abs(rowDiff) === 2 && Math.abs(colDiff) === 1) || 
               (Math.abs(rowDiff) === 1 && Math.abs(colDiff) === 2);

      case 'bishop':
        return Math.abs(rowDiff) === Math.abs(colDiff) && isPathClearForBot(from, to, currentBoard);

      case 'queen':
        return (rowDiff === 0 || colDiff === 0 || Math.abs(rowDiff) === Math.abs(colDiff)) && 
               isPathClearForBot(from, to, currentBoard);

      case 'king':
        return Math.abs(rowDiff) <= 1 && Math.abs(colDiff) <= 1;

      default:
        return false;
    }
  };

  const isKingInCheck = (player: Player, currentBoard: (Piece | null)[][]): boolean => {
    const kingPos = findKing(player, currentBoard);
    if (!kingPos) return false;
    
    const opponent = player === 'white' ? 'black' : 'white';
    return isSquareUnderAttack(kingPos, opponent, currentBoard);
  };

  const wouldMoveLeaveKingInCheck = (from: Position, to: Position, currentBoard: (Piece | null)[][]): boolean => {
    const piece = currentBoard[from.row][from.col];
    if (!piece) return true;

    const testBoard = currentBoard.map(row => [...row]);
    testBoard[to.row][to.col] = testBoard[from.row][from.col];
    testBoard[from.row][from.col] = null;

    return isKingInCheck(piece.player, testBoard);
  };

  const hasLegalMoves = (player: Player, currentBoard: (Piece | null)[][]): boolean => {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = currentBoard[row][col];
        if (piece && piece.player === player) {
          for (let targetRow = 0; targetRow < 8; targetRow++) {
            for (let targetCol = 0; targetCol < 8; targetCol++) {
              if (isValidMoveForBot({ row, col }, { row: targetRow, col: targetCol }, piece, currentBoard)) {
                if (!wouldMoveLeaveKingInCheck({ row, col }, { row: targetRow, col: targetCol }, currentBoard)) {
                  return true;
                }
              }
            }
          }
        }
      }
    }
    return false;
  };

  const checkForCheckmate = (player: Player, currentBoard: (Piece | null)[][]): boolean => {
    const inCheck = isKingInCheck(player, currentBoard);
    const hasNoMoves = !hasLegalMoves(player, currentBoard);
    return inCheck && hasNoMoves;
  };

  const isValidMove = (from: Position, to: Position, piece: Piece): boolean => {
    const rowDiff = to.row - from.row;
    const colDiff = to.col - from.col;
    const targetPiece = board[to.row][to.col];

    if (targetPiece && targetPiece.player === piece.player) return false;

    switch (piece.type) {
      case 'pawn':
        const direction = piece.player === 'white' ? -1 : 1;
        // Normal move
        if (colDiff === 0 && !targetPiece) {
          if (rowDiff === direction) return true;
          if (!piece.hasMoved && rowDiff === direction * 2 && !board[from.row + direction][from.col]) return true;
        }
        // Capture
        if (Math.abs(colDiff) === 1 && rowDiff === direction) {
          if (targetPiece) return true;
          // En passant
          if (gameState.lastMove) {
            const lastFrom = gameState.lastMove.from;
            const lastTo = gameState.lastMove.to;
            const lastPiece = board[lastTo.row][lastTo.col];
            if (lastPiece && lastPiece.type === 'pawn' && lastPiece.enPassantVulnerable &&
                lastTo.row === from.row && lastTo.col === to.col &&
                Math.abs(lastFrom.row - lastTo.row) === 2) {
              return true;
            }
          }
        }
        return false;

      case 'rook':
        return (rowDiff === 0 || colDiff === 0) && isPathClear(from, to);

      case 'knight':
        return (Math.abs(rowDiff) === 2 && Math.abs(colDiff) === 1) || 
               (Math.abs(rowDiff) === 1 && Math.abs(colDiff) === 2);

      case 'bishop':
        return Math.abs(rowDiff) === Math.abs(colDiff) && isPathClear(from, to);

      case 'queen':
        return (rowDiff === 0 || colDiff === 0 || Math.abs(rowDiff) === Math.abs(colDiff)) && isPathClear(from, to);

      case 'king':
        // Normal king move
        if (Math.abs(rowDiff) <= 1 && Math.abs(colDiff) <= 1) return true;
        // Castling
        if (!piece.hasMoved && rowDiff === 0 && Math.abs(colDiff) === 2) {
          const rookCol = colDiff > 0 ? 7 : 0;
          const rook = board[from.row][rookCol];
          if (rook && rook.type === 'rook' && !rook.hasMoved) {
            const path = colDiff > 0 ? [from.col + 1, from.col + 2] : [from.col - 1, from.col - 2, from.col - 3];
            const pathClear = path.every(col => !board[from.row][col] || col === from.col - 3);
            if (pathClear) {
              // King can't castle through check
              const opponent = piece.player === 'white' ? 'black' : 'white';
              const checkPath = colDiff > 0 ? [from.col, from.col + 1, from.col + 2] : [from.col, from.col - 1, from.col - 2];
              return !checkPath.some(col => isSquareUnderAttack({ row: from.row, col }, opponent, board));
            }
          }
        }
        return false;

      default:
        return false;
    }
  };

  const isPathClear = (from: Position, to: Position): boolean => {
    const rowDir = to.row > from.row ? 1 : to.row < from.row ? -1 : 0;
    const colDir = to.col > from.col ? 1 : to.col < from.col ? -1 : 0;
    let row = from.row + rowDir;
    let col = from.col + colDir;

    while (row !== to.row || col !== to.col) {
      if (board[row][col]) return false;
      row += rowDir;
      col += colDir;
    }
    return true;
  };

  const getValidMoves = (pos: Position): Position[] => {
    const piece = board[pos.row][pos.col];
    if (!piece) return [];

    const moves: Position[] = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (isValidMove(pos, { row, col }, piece)) {
          if (!wouldMoveLeaveKingInCheck(pos, { row, col }, board)) {
            moves.push({ row, col });
          }
        }
      }
    }
    return moves;
  };

  const makeMove = (from: Position, to: Position) => {
    const newBoard = board.map(row => [...row]);
    const piece = newBoard[from.row][from.col];
    
    if (piece) {
      newBoard[to.row][to.col] = { ...piece, hasMoved: true };
      newBoard[from.row][from.col] = null;

      // Check for king capture
      const capturedPiece = board[to.row][to.col];
      if (capturedPiece && capturedPiece.type === 'king') {
        setGameOver(true);
        setWinner(piece.player === 'white' ? 'You' : 'Bot');
      }

      setBoard(newBoard);
      return newBoard;
    }
    return board;
  };

  const makeBotMove = (currentBoard: (Piece | null)[][]) => {
    const botPlayer = playerColor === 'white' ? 'black' : 'white';
    
    const evaluatePosition = (board: (Piece | null)[][], player: Player): number => {
      let score = 0;
      const pieceValues: Record<PieceType, number> = {
        pawn: 100, knight: 320, bishop: 330, rook: 500, queen: 900, king: 20000
      };

      // Scale position bonuses based on rating
      const positionWeight = (botRating - 1000) / 1500; // 0 to 1 scale

      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          const piece = board[row][col];
          if (!piece) continue;

          let value = pieceValues[piece.type];
          
          // Position bonuses (stronger at higher ratings)
          if (piece.type === 'pawn') {
            const advancementBonus = piece.player === 'white' ? (6 - row) * 10 : (row - 1) * 10;
            value += advancementBonus * (0.5 + positionWeight * 0.5);
          }
          
          // Center control bonus
          const centerDistance = Math.abs(row - 3.5) + Math.abs(col - 3.5);
          value += (7 - centerDistance) * 5 * (0.3 + positionWeight * 0.7);

          if (piece.player === player) {
            score += value;
          } else {
            score -= value;
          }
        }
      }
      return score;
    };

    const botMoves: { from: Position; to: Position; score: number }[] = [];

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = currentBoard[row][col];
        if (piece && piece.player === botPlayer) {
          const moves = getValidMovesForBot({ row, col }, currentBoard);
          moves.forEach(to => {
            const testBoard = currentBoard.map(r => [...r]);
            const capturedPiece = testBoard[to.row][to.col];
            testBoard[to.row][to.col] = testBoard[row][col];
            testBoard[row][col] = null;
            
            let moveScore = evaluatePosition(testBoard, botPlayer);
            
            // Bonus for captures
            if (capturedPiece) {
              moveScore += 50;
            }
            
            botMoves.push({ from: { row, col }, to, score: moveScore });
          });
        }
      }
    }

    if (botMoves.length > 0) {
      // Number of top moves to consider (fewer at lower ratings)
      const topMovesCount = Math.floor(1 + (botRating - 1000) / 300);
      
      botMoves.sort((a, b) => b.score - a.score);
      const topMoves = botMoves.slice(0, Math.min(topMovesCount, botMoves.length));
      
      // At lower ratings, occasionally pick suboptimal moves
      const randomFactor = Math.random();
      const thinkingLevel = (botRating - 1000) / 1500; // 0 to 1
      const move = randomFactor < thinkingLevel 
        ? topMoves[0] 
        : topMoves[Math.floor(Math.random() * topMoves.length)];
      
      const piece = currentBoard[move.from.row][move.from.col];
      if (piece) {
        const newBoard = currentBoard.map(r => [...r]);
        const capturedPiece = newBoard[move.to.row][move.to.col];
        
        // Clear en passant flags
        newBoard.forEach(r => r.forEach(p => { if (p) p.enPassantVulnerable = false; }));
        
        // Handle en passant
        if (piece.type === 'pawn' && Math.abs(move.from.col - move.to.col) === 1 && !capturedPiece) {
          newBoard[move.from.row][move.to.col] = null;
        }
        
        // Handle castling
        if (piece.type === 'king' && Math.abs(move.from.col - move.to.col) === 2) {
          const rookFromCol = move.to.col > move.from.col ? 7 : 0;
          const rookToCol = move.to.col > move.from.col ? move.to.col - 1 : move.to.col + 1;
          newBoard[move.to.row][rookToCol] = newBoard[move.to.row][rookFromCol];
          newBoard[move.to.row][rookFromCol] = null;
          if (newBoard[move.to.row][rookToCol]) newBoard[move.to.row][rookToCol]!.hasMoved = true;
        }
        
        const movedPiece = { ...piece, hasMoved: true };
        if (piece.type === 'pawn' && Math.abs(move.from.row - move.to.row) === 2) {
          movedPiece.enPassantVulnerable = true;
        }
        
        newBoard[move.to.row][move.to.col] = movedPiece;
        newBoard[move.from.row][move.from.col] = null;

        // Check for king capture
        if (capturedPiece && capturedPiece.type === 'king') {
          setGameOver(true);
          setWinner('Bot');
        }

        setBoard(newBoard);
        setGameState({ lastMove: { from: move.from, to: move.to } });
        
        // Check if player is in check or checkmate
        const opponentColor = botPlayer === 'white' ? 'black' : 'white';
        const opponentCheck = isKingInCheck(opponentColor, newBoard);
        const opponentCheckmate = checkForCheckmate(opponentColor, newBoard);
        
        if (opponentColor === 'white') {
          setWhiteInCheck(opponentCheck);
          setBlackInCheck(false);
        } else {
          setBlackInCheck(opponentCheck);
          setWhiteInCheck(false);
        }
        
        if (opponentCheckmate) {
          setGameOver(true);
          setWinner('Bot');
        }
        
        setCurrentPlayer(opponentColor);
      }
    }
  };

  const getValidMovesForBot = (pos: Position, currentBoard: (Piece | null)[][]): Position[] => {
    const piece = currentBoard[pos.row][pos.col];
    if (!piece) return [];

    const moves: Position[] = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (isValidMoveForBot(pos, { row, col }, piece, currentBoard)) {
          if (!wouldMoveLeaveKingInCheck(pos, { row, col }, currentBoard)) {
            moves.push({ row, col });
          }
        }
      }
    }
    return moves;
  };

  const isValidMoveForBot = (from: Position, to: Position, piece: Piece, currentBoard: (Piece | null)[][]): boolean => {
    const rowDiff = to.row - from.row;
    const colDiff = to.col - from.col;
    const targetPiece = currentBoard[to.row][to.col];

    if (targetPiece && targetPiece.player === piece.player) return false;

    switch (piece.type) {
      case 'pawn':
        const direction = piece.player === 'white' ? -1 : 1;
        if (colDiff === 0 && !targetPiece) {
          if (rowDiff === direction) return true;
          if (!piece.hasMoved && rowDiff === direction * 2 && !currentBoard[from.row + direction][from.col]) return true;
        }
        if (Math.abs(colDiff) === 1 && rowDiff === direction) {
          if (targetPiece) return true;
          // En passant for bot
          if (gameState.lastMove) {
            const lastFrom = gameState.lastMove.from;
            const lastTo = gameState.lastMove.to;
            const lastPiece = currentBoard[lastTo.row][lastTo.col];
            if (lastPiece && lastPiece.type === 'pawn' && lastPiece.enPassantVulnerable &&
                lastTo.row === from.row && lastTo.col === to.col &&
                Math.abs(lastFrom.row - lastTo.row) === 2) {
              return true;
            }
          }
        }
        return false;

      case 'rook':
        return (rowDiff === 0 || colDiff === 0) && isPathClearForBot(from, to, currentBoard);

      case 'knight':
        return (Math.abs(rowDiff) === 2 && Math.abs(colDiff) === 1) || 
               (Math.abs(rowDiff) === 1 && Math.abs(colDiff) === 2);

      case 'bishop':
        return Math.abs(rowDiff) === Math.abs(colDiff) && isPathClearForBot(from, to, currentBoard);

      case 'queen':
        return (rowDiff === 0 || colDiff === 0 || Math.abs(rowDiff) === Math.abs(colDiff)) && isPathClearForBot(from, to, currentBoard);

      case 'king':
        if (Math.abs(rowDiff) <= 1 && Math.abs(colDiff) <= 1) return true;
        // Castling for bot
        if (!piece.hasMoved && rowDiff === 0 && Math.abs(colDiff) === 2) {
          const rookCol = colDiff > 0 ? 7 : 0;
          const rook = currentBoard[from.row][rookCol];
          if (rook && rook.type === 'rook' && !rook.hasMoved) {
            const path = colDiff > 0 ? [from.col + 1, from.col + 2] : [from.col - 1, from.col - 2, from.col - 3];
            const pathClear = path.every(col => !currentBoard[from.row][col] || col === from.col - 3);
            if (pathClear) {
              const opponent = piece.player === 'white' ? 'black' : 'white';
              const checkPath = colDiff > 0 ? [from.col, from.col + 1, from.col + 2] : [from.col, from.col - 1, from.col - 2];
              return !checkPath.some(col => isSquareUnderAttack({ row: from.row, col }, opponent, currentBoard));
            }
          }
        }
        return false;

      default:
        return false;
    }
  };

  const isPathClearForBot = (from: Position, to: Position, currentBoard: (Piece | null)[][]): boolean => {
    const rowDir = to.row > from.row ? 1 : to.row < from.row ? -1 : 0;
    const colDir = to.col > from.col ? 1 : to.col < from.col ? -1 : 0;
    let row = from.row + rowDir;
    let col = from.col + colDir;

    while (row !== to.row || col !== to.col) {
      if (currentBoard[row][col]) return false;
      row += rowDir;
      col += colDir;
    }
    return true;
  };

  const handleSquareClick = (row: number, col: number) => {
    if (gameOver || currentPlayer !== playerColor) return;

    if (selectedPos) {
      const isValid = validMoves.some(m => m.row === row && m.col === col);
      if (isValid) {
        const piece = board[selectedPos.row][selectedPos.col];
        if (piece) {
          const newBoard = board.map(r => [...r]);
          const capturedPiece = newBoard[row][col];
          
          // Clear en passant flags
          newBoard.forEach(r => r.forEach(p => { if (p) p.enPassantVulnerable = false; }));
          
          // Handle en passant capture
          if (piece.type === 'pawn' && Math.abs(selectedPos.col - col) === 1 && !capturedPiece) {
            newBoard[selectedPos.row][col] = null; // Remove captured pawn
          }
          
          // Handle castling
          if (piece.type === 'king' && Math.abs(selectedPos.col - col) === 2) {
            const rookFromCol = col > selectedPos.col ? 7 : 0;
            const rookToCol = col > selectedPos.col ? col - 1 : col + 1;
            newBoard[row][rookToCol] = newBoard[row][rookFromCol];
            newBoard[row][rookFromCol] = null;
            if (newBoard[row][rookToCol]) newBoard[row][rookToCol]!.hasMoved = true;
          }
          
          // Mark pawn for en passant if it moved 2 squares
          const movedPiece = { ...piece, hasMoved: true };
          if (piece.type === 'pawn' && Math.abs(selectedPos.row - row) === 2) {
            movedPiece.enPassantVulnerable = true;
          }
          
          newBoard[row][col] = movedPiece;
          newBoard[selectedPos.row][selectedPos.col] = null;

          // Check for king capture
          if (capturedPiece && capturedPiece.type === 'king') {
            setGameOver(true);
            setWinner('You');
          }

          setBoard(newBoard);
          setGameState({ lastMove: { from: selectedPos, to: { row, col } } });
          setSelectedPos(null);
          setValidMoves([]);
          
          // Check if opponent is in check or checkmate
          const opponentColor = playerColor === 'white' ? 'black' : 'white';
          const opponentCheck = isKingInCheck(opponentColor, newBoard);
          const opponentCheckmate = checkForCheckmate(opponentColor, newBoard);
          
          if (opponentColor === 'black') {
            setBlackInCheck(opponentCheck);
            setWhiteInCheck(false);
          } else {
            setWhiteInCheck(opponentCheck);
            setBlackInCheck(false);
          }
          
          if (opponentCheckmate) {
            setGameOver(true);
            setWinner('You');
            setCurrentPlayer(opponentColor);
          } else {
            setCurrentPlayer(opponentColor);
            if (!capturedPiece || capturedPiece.type !== 'king') {
              setTimeout(() => makeBotMove(newBoard), 500);
            }
          }
        }
      } else {
        setSelectedPos(null);
        setValidMoves([]);
      }
    } else {
      const piece = board[row][col];
      if (piece && piece.player === playerColor) {
        setSelectedPos({ row, col });
        setValidMoves(getValidMoves({ row, col }));
      }
    }
  };

  const resetGame = () => {
    setBoard(initialBoard());
    setSelectedPos(null);
    setValidMoves([]);
    setCurrentPlayer('white');
    setGameOver(false);
    setWinner(null);
    setGameState({});
    setWhiteInCheck(false);
    setBlackInCheck(false);
  };

  return (
    <div className="chess-game">
      <div className="chess-header">
        <button onClick={onBack} className="back-btn">⚙️ Settings</button>
        <h2>♟️ Chess vs Bot ({botRating})</h2>
        <button onClick={resetGame} className="reset-chess-btn">New Game</button>
      </div>

      {gameOver && winner && (
        <div className="chess-winner-banner">
          <h1>🏆 {winner} Win{winner === 'You' ? '' : 's'}! 🏆</h1>
          <p>{winner === 'You' ? 'Checkmate! You defeated the bot!' : 'Checkmate! The bot wins!'}</p>
        </div>
      )}

      <div className="chess-status">
        <p>
          {gameOver ? 'Game Over!' : `${currentPlayer === playerColor ? 'Your' : "Bot's"} Turn`}
          {whiteInCheck && !gameOver && currentPlayer === 'white' && <span className="check-indicator"> - CHECK!</span>}
          {blackInCheck && !gameOver && currentPlayer === 'black' && <span className="check-indicator"> - CHECK!</span>}
        </p>
      </div>

      <div className="chessboard">
        {(playerColor === 'black' ? [...board].reverse() : board).map((row, displayRowIndex) => {
          const rowIndex = playerColor === 'black' ? 7 - displayRowIndex : displayRowIndex;
          return (
            <div key={rowIndex} className="chess-row">
              {(playerColor === 'black' ? [...row].reverse() : row).map((piece, displayColIndex) => {
                const colIndex = playerColor === 'black' ? 7 - displayColIndex : displayColIndex;
                const isLight = (rowIndex + colIndex) % 2 === 0;
                const isSelected = selectedPos?.row === rowIndex && selectedPos?.col === colIndex;
                const isValidMove = validMoves.some(m => m.row === rowIndex && m.col === colIndex);

                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`chess-square ${isLight ? 'light' : 'dark'} ${isSelected ? 'selected' : ''} ${isValidMove ? 'valid-move' : ''}`}
                    onClick={() => handleSquareClick(rowIndex, colIndex)}
                  >
                    {piece && (
                      <span className={`chess-piece ${piece.player}`}>
                        {pieceSymbols[piece.type][piece.player]}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
