import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

const COLORS = [
  { name: 'أحمر', bg: 'bg-red-500', active: 'bg-red-300', border: 'border-red-700' },
  { name: 'أزرق', bg: 'bg-blue-500', active: 'bg-blue-300', border: 'border-blue-700' },
  { name: 'أخضر', bg: 'bg-green-500', active: 'bg-green-300', border: 'border-green-700' },
  { name: 'أصفر', bg: 'bg-yellow-500', active: 'bg-yellow-300', border: 'border-yellow-700' },
];

type GameState = 'idle' | 'showing' | 'playerTurn' | 'gameOver';

export default function SimonSays() {
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [activeColor, setActiveColor] = useState<number | null>(null);
  const [gameState, setGameState] = useState<GameState>('idle');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [level, setLevel] = useState(0);
  const [message, setMessage] = useState('');
  const timeoutRef = useRef<number | null>(null);

  const clearTimeouts = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const showSequence = useCallback((seq: number[]) => {
    setGameState('showing');
    setMessage('👀 شاهد التسلسل...');
    setActiveColor(null);

    let i = 0;
    const showNext = () => {
      if (i < seq.length) {
        setActiveColor(seq[i]);
        timeoutRef.current = window.setTimeout(() => {
          setActiveColor(null);
          i++;
          timeoutRef.current = window.setTimeout(showNext, 300);
        }, 600);
      } else {
        setGameState('playerTurn');
        setMessage('🎯 دورك! كرر التسلسل');
      }
    };

    timeoutRef.current = window.setTimeout(showNext, 500);
  }, []);

  const startGame = () => {
    clearTimeouts();
    const firstColor = Math.floor(Math.random() * 4);
    const newSequence = [firstColor];
    setSequence(newSequence);
    setPlayerSequence([]);
    setScore(0);
    setLevel(1);
    setMessage('');
    showSequence(newSequence);
  };

  const nextLevel = useCallback(() => {
    const newColor = Math.floor(Math.random() * 4);
    const newSequence = [...sequence, newColor];
    setSequence(newSequence);
    setPlayerSequence([]);
    setLevel(prev => prev + 1);
    setScore(prev => prev + level * 10);
    
    timeoutRef.current = window.setTimeout(() => {
      showSequence(newSequence);
    }, 1000);
  }, [sequence, level, showSequence]);

  const handleColorClick = (colorIndex: number) => {
    if (gameState !== 'playerTurn') return;

    // Flash the clicked color
    setActiveColor(colorIndex);
    setTimeout(() => setActiveColor(null), 200);

    const newPlayerSequence = [...playerSequence, colorIndex];
    setPlayerSequence(newPlayerSequence);

    const currentIndex = newPlayerSequence.length - 1;

    // Check if correct
    if (newPlayerSequence[currentIndex] !== sequence[currentIndex]) {
      // Wrong!
      setGameState('gameOver');
      setMessage('💀 خطأ! انتهت اللعبة');
      if (score > highScore) {
        setHighScore(score);
      }
      return;
    }

    // Check if sequence complete
    if (newPlayerSequence.length === sequence.length) {
      setMessage('✅ ممتاز! المستوى التالي...');
      nextLevel();
    }
  };

  useEffect(() => {
    return () => clearTimeouts();
  }, []);

  return (
    <div className="text-white py-8 px-4 min-h-screen" dir="rtl">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/games" className="text-gray-400 hover:text-white transition-colors">
            → العودة للألعاب
          </Link>
          <button
            onClick={startGame}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            🔄 لعبة جديدة
          </button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">🧠 سيمون يقول</h1>
          <p className="text-gray-400">تذكر تسلسل الألوان وكرره! كل مستوى يزداد صعوبة</p>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-6 mb-8 flex-wrap">
          <div className="bg-white/10 rounded-xl px-6 py-3 text-center">
            <div className="text-2xl font-bold text-purple-400">{level}</div>
            <div className="text-sm text-gray-400">المستوى</div>
          </div>
          <div className="bg-white/10 rounded-xl px-6 py-3 text-center">
            <div className="text-2xl font-bold text-green-400">{score}</div>
            <div className="text-sm text-gray-400">النقاط</div>
          </div>
          <div className="bg-white/10 rounded-xl px-6 py-3 text-center">
            <div className="text-2xl font-bold text-yellow-400">{highScore}</div>
            <div className="text-sm text-gray-400">أعلى نتيجة</div>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className={`text-center mb-6 p-4 rounded-xl ${
            gameState === 'gameOver' ? 'bg-red-500/20 border border-red-500/30' :
            gameState === 'showing' ? 'bg-blue-500/20 border border-blue-500/30' :
            'bg-green-500/20 border border-green-500/30'
          }`}>
            <p className="text-xl font-bold">{message}</p>
          </div>
        )}

        {/* Game Board */}
        <div className="max-w-sm mx-auto">
          <div className="grid grid-cols-2 gap-4 aspect-square">
            {COLORS.map((color, index) => (
              <button
                key={index}
                onClick={() => handleColorClick(index)}
                disabled={gameState !== 'playerTurn'}
                className={`rounded-2xl border-4 transition-all duration-150 ${color.border} ${
                  activeColor === index ? color.active : color.bg
                } ${
                  activeColor === index ? 'scale-95 brightness-150' : 'scale-100'
                } ${
                  gameState === 'playerTurn' ? 'hover:scale-105 cursor-pointer active:scale-95' : ''
                } ${
                  gameState === 'idle' || gameState === 'gameOver' ? 'opacity-60' : ''
                } shadow-lg`}
              >
                <div className="w-full h-full flex items-center justify-center">
                  {activeColor === index && (
                    <span className="text-4xl">💡</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Start / Game Over */}
        {gameState === 'idle' && (
          <div className="text-center mt-8">
            <button
              onClick={startGame}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-lg font-bold hover:scale-105 transition-transform shadow-lg"
            >
              🎮 ابدأ اللعب
            </button>
          </div>
        )}

        {gameState === 'gameOver' && (
          <div className="text-center mt-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 max-w-sm mx-auto">
              <p className="text-gray-300">وصلت للمستوى <span className="text-purple-400 font-bold">{level}</span></p>
              <p className="text-gray-300">النقاط: <span className="text-green-400 font-bold">{score}</span></p>
              {score >= highScore && score > 0 && (
                <p className="text-yellow-400 mt-2 font-bold">🏆 رقم قياسي جديد!</p>
              )}
            </div>
            <button
              onClick={startGame}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-lg font-bold hover:scale-105 transition-transform shadow-lg"
            >
              🔄 حاول مرة أخرى
            </button>
          </div>
        )}

        {/* Instructions */}
        {gameState === 'idle' && (
          <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6 max-w-md mx-auto">
            <h3 className="text-lg font-bold mb-3 text-center">📖 كيف تلعب؟</h3>
            <div className="space-y-2 text-gray-300 text-sm">
              <p>👀 شاهد التسلسل الذي يضيء</p>
              <p>🎯 كرر التسلسل بنفس الترتيب</p>
              <p>📈 كل مستوى يضيف لون جديد</p>
              <p>💀 خطأ واحد = نهاية اللعبة</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
