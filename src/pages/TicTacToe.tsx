import { useState } from 'react';
import { Link } from 'react-router-dom';

type Player = 'X' | 'O' | null;

const WINNING_COMBOS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function checkWinner(board: Player[]): { winner: Player; line: number[] } | null {
  for (const combo of WINNING_COMBOS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: combo };
    }
  }
  return null;
}

function getBestMove(board: Player[]): number {
  // Simple AI: try to win, then block, then center, then corner, then any
  // Try to win
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      const testBoard = [...board];
      testBoard[i] = 'O';
      if (checkWinner(testBoard)?.winner === 'O') return i;
    }
  }
  // Block player
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      const testBoard = [...board];
      testBoard[i] = 'X';
      if (checkWinner(testBoard)?.winner === 'X') return i;
    }
  }
  // Center
  if (!board[4]) return 4;
  // Corners
  const corners = [0, 2, 6, 8].filter(i => !board[i]);
  if (corners.length > 0) return corners[Math.floor(Math.random() * corners.length)];
  // Any
  const available = board.map((v, i) => v === null ? i : -1).filter(i => i !== -1);
  return available[Math.floor(Math.random() * available.length)];
}

export default function TicTacToe() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [result, setResult] = useState<string>('');
  const [winningLine, setWinningLine] = useState<number[]>([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setGameOver(false);
    setResult('');
    setWinningLine([]);
  };

  const handleClick = (index: number) => {
    if (board[index] || gameOver || !isPlayerTurn) return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);

    const winResult = checkWinner(newBoard);
    if (winResult) {
      setGameOver(true);
      setResult('🎉 فزت!');
      setWinningLine(winResult.line);
      setPlayerScore(prev => prev + 1);
      return;
    }

    if (newBoard.every(cell => cell !== null)) {
      setGameOver(true);
      setResult('🤝 تعادل!');
      return;
    }

    setIsPlayerTurn(false);

    // Computer move
    setTimeout(() => {
      const aiMove = getBestMove(newBoard);
      const aiBoard = [...newBoard];
      aiBoard[aiMove] = 'O';
      setBoard(aiBoard);

      const aiWinResult = checkWinner(aiBoard);
      if (aiWinResult) {
        setGameOver(true);
        setResult('😢 الكمبيوتر فاز!');
        setWinningLine(aiWinResult.line);
        setComputerScore(prev => prev + 1);
        return;
      }

      if (aiBoard.every(cell => cell !== null)) {
        setGameOver(true);
        setResult('🤝 تعادل!');
        return;
      }

      setIsPlayerTurn(true);
    }, 500);
  };

  return (
    <div className="text-white py-8 px-4 min-h-screen" dir="rtl">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/games" className="text-gray-400 hover:text-white transition-colors">
            → العودة للألعاب
          </Link>
          <button
            onClick={resetGame}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            🔄 لعبة جديدة
          </button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">❌ إكس أو</h1>
          <p className="text-gray-400">العب ضد الكمبيوتر! أنت X والكمبيوتر O</p>
        </div>

        {/* Score */}
        <div className="flex justify-center gap-8 mb-8">
          <div className="bg-white/10 rounded-xl px-6 py-3 text-center">
            <div className="text-2xl font-bold text-blue-400">{playerScore}</div>
            <div className="text-sm text-gray-400">أنت (X)</div>
          </div>
          <div className="bg-white/10 rounded-xl px-6 py-3 text-center">
            <div className="text-2xl font-bold text-red-400">{computerScore}</div>
            <div className="text-sm text-gray-400">الكمبيوتر (O)</div>
          </div>
        </div>

        {/* Result */}
        {gameOver && (
          <div className="text-center mb-6 p-4 bg-white/10 rounded-xl">
            <p className="text-2xl font-bold">{result}</p>
          </div>
        )}

        {/* Turn indicator */}
        {!gameOver && (
          <div className="text-center mb-6">
            <p className={`text-lg ${isPlayerTurn ? 'text-blue-400' : 'text-red-400'}`}>
              {isPlayerTurn ? '🎯 دورك!' : '🤖 الكمبيوتر يفكر...'}
            </p>
          </div>
        )}

        {/* Board */}
        <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className={`aspect-square rounded-xl text-4xl md:text-5xl font-bold flex items-center justify-center transition-all duration-300 ${
                winningLine.includes(index)
                  ? 'bg-green-500/30 border-2 border-green-400 scale-105'
                  : cell
                  ? 'bg-white/10 border border-white/20'
                  : 'bg-white/5 border border-white/10 hover:bg-white/15 hover:scale-105 cursor-pointer'
              }`}
            >
              {cell === 'X' && <span className="text-blue-400">X</span>}
              {cell === 'O' && <span className="text-red-400">O</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
