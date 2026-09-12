import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

export default function SnakeGame() {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [isRunning, setIsRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const directionRef = useRef<Direction>('RIGHT');
  const gameLoopRef = useRef<number | null>(null);

  const generateFood = useCallback((snakeBody: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snakeBody.some(seg => seg.x === newFood.x && seg.y === newFood.y));
    return newFood;
  }, []);

  const resetGame = () => {
    const initialSnake = [{ x: 10, y: 10 }];
    setSnake(initialSnake);
    setFood(generateFood(initialSnake));
    setDirection('RIGHT');
    directionRef.current = 'RIGHT';
    setGameOver(false);
    setScore(0);
    setIsRunning(false);
  };

  const moveSnake = useCallback(() => {
    setSnake((prevSnake) => {
      const head = { ...prevSnake[0] };
      const dir = directionRef.current;

      switch (dir) {
        case 'UP': head.y -= 1; break;
        case 'DOWN': head.y += 1; break;
        case 'LEFT': head.x -= 1; break;
        case 'RIGHT': head.x += 1; break;
      }

      // Check wall collision
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameOver(true);
        setIsRunning(false);
        return prevSnake;
      }

      // Check self collision
      if (prevSnake.some(seg => seg.x === head.x && seg.y === head.y)) {
        setGameOver(true);
        setIsRunning(false);
        return prevSnake;
      }

      const newSnake = [head, ...prevSnake];

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore((prev) => {
          const newScore = prev + 10;
          setHighScore((hs) => Math.max(hs, newScore));
          return newScore;
        });
        setFood(generateFood(newSnake));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [food, generateFood]);

  useEffect(() => {
    if (isRunning && !gameOver) {
      gameLoopRef.current = window.setInterval(moveSnake, INITIAL_SPEED);
    }
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [isRunning, gameOver, moveSnake]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
    if (arrowKeys.includes(e.key)) {
      e.preventDefault();
    }
    
    switch (e.key) {
      case 'ArrowUp':
        if (directionRef.current !== 'DOWN') {
          directionRef.current = 'UP';
          setDirection('UP');
        }
        break;
      case 'ArrowDown':
        if (directionRef.current !== 'UP') {
          directionRef.current = 'DOWN';
          setDirection('DOWN');
        }
        break;
      case 'ArrowLeft':
        if (directionRef.current !== 'RIGHT') {
          directionRef.current = 'LEFT';
          setDirection('LEFT');
        }
        break;
      case 'ArrowRight':
        if (directionRef.current !== 'LEFT') {
          directionRef.current = 'RIGHT';
          setDirection('RIGHT');
        }
        break;
      case ' ':
        e.preventDefault();
        if (!isRunning && !gameOver) {
          setIsRunning(true);
        }
        break;
    }
  }, [isRunning, gameOver]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleDirectionButton = (dir: Direction) => {
    const opposites: Record<Direction, Direction> = {
      UP: 'DOWN', DOWN: 'UP', LEFT: 'RIGHT', RIGHT: 'LEFT'
    };
    if (directionRef.current !== opposites[dir]) {
      directionRef.current = dir;
      setDirection(dir);
    }
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
          <h1 className="text-4xl font-bold mb-2">🐍 لعبة الثعبان</h1>
          <p className="text-gray-400">استخدم الأسهم للتحكم بالثعبان وكل الطعام!</p>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8 mb-6">
          <div className="bg-white/10 rounded-xl px-6 py-3 text-center">
            <div className="text-2xl font-bold text-green-400">{score}</div>
            <div className="text-sm text-gray-400">النقاط</div>
          </div>
          <div className="bg-white/10 rounded-xl px-6 py-3 text-center">
            <div className="text-2xl font-bold text-yellow-400">{highScore}</div>
            <div className="text-sm text-gray-400">أعلى نتيجة</div>
          </div>
        </div>

        {/* Game Board */}
        <div className="flex flex-col items-center">
          <div
            className="relative border-2 border-green-500/50 rounded-lg bg-gray-900/80"
            style={{
              width: GRID_SIZE * CELL_SIZE,
              height: GRID_SIZE * CELL_SIZE,
            }}
          >
            {/* Grid pattern */}
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => (
              <div
                key={i}
                className="absolute border border-gray-800/30"
                style={{
                  left: (i % GRID_SIZE) * CELL_SIZE,
                  top: Math.floor(i / GRID_SIZE) * CELL_SIZE,
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                }}
              />
            ))}

            {/* Snake */}
            {snake.map((segment, index) => (
              <div
                key={index}
                className={`absolute rounded-sm ${index === 0 ? 'bg-green-400' : 'bg-green-500/80'}`}
                style={{
                  left: segment.x * CELL_SIZE + 1,
                  top: segment.y * CELL_SIZE + 1,
                  width: CELL_SIZE - 2,
                  height: CELL_SIZE - 2,
                }}
              />
            ))}

            {/* Food */}
            <div
              className="absolute flex items-center justify-center text-sm"
              style={{
                left: food.x * CELL_SIZE,
                top: food.y * CELL_SIZE,
                width: CELL_SIZE,
                height: CELL_SIZE,
              }}
            >
              🍎
            </div>

            {/* Game Over Overlay */}
            {gameOver && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-lg">
                <div className="text-center">
                  <div className="text-4xl mb-2">💀</div>
                  <p className="text-xl font-bold text-red-400">انتهت اللعبة!</p>
                  <p className="text-gray-300">النقاط: {score}</p>
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="mt-6">
            {!isRunning && !gameOver && (
              <button
                onClick={() => setIsRunning(true)}
                className="px-8 py-3 bg-green-600 hover:bg-green-700 rounded-xl text-lg font-bold transition-colors mb-4 block mx-auto"
              >
                ▶ ابدأ اللعب
              </button>
            )}
            
            {/* Mobile Controls */}
            <div className="grid grid-cols-3 gap-2 w-40 mx-auto mt-4">
              <div></div>
              <button
                onClick={() => handleDirectionButton('UP')}
                className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-center"
              >
                ↑
              </button>
              <div></div>
              <button
                onClick={() => handleDirectionButton('LEFT')}
                className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-center"
              >
                ←
              </button>
              <button
                onClick={() => handleDirectionButton('DOWN')}
                className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-center"
              >
                ↓
              </button>
              <button
                onClick={() => handleDirectionButton('RIGHT')}
                className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-center"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
