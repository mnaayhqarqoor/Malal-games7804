import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

const HOLES = 9;
const GAME_DURATION = 30;

export default function WhackAMole() {
  const [moles, setMoles] = useState<boolean[]>(Array(HOLES).fill(false));
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [hitEffect, setHitEffect] = useState<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const moleTimerRef = useRef<number | null>(null);

  const showMole = useCallback(() => {
    setMoles(prev => {
      const newMoles = Array(HOLES).fill(false);
      const randomIndex = Math.floor(Math.random() * HOLES);
      newMoles[randomIndex] = true;
      return newMoles;
    });
  }, []);

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setIsPlaying(true);
    setMoles(Array(HOLES).fill(false));
  };

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsPlaying(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, timeLeft]);

  useEffect(() => {
    if (isPlaying) {
      const speed = Math.max(400, 1000 - score * 10);
      moleTimerRef.current = window.setInterval(showMole, speed);
    }
    return () => {
      if (moleTimerRef.current) clearInterval(moleTimerRef.current);
    };
  }, [isPlaying, showMole, score]);

  useEffect(() => {
    if (!isPlaying && timeLeft === 0 && score > highScore) {
      setHighScore(score);
    }
  }, [timeLeft, isPlaying, score, highScore]);

  const whackMole = (index: number) => {
    if (!isPlaying || !moles[index]) return;
    
    setScore(prev => prev + 1);
    setHitEffect(index);
    
    const newMoles = [...moles];
    newMoles[index] = false;
    setMoles(newMoles);

    setTimeout(() => setHitEffect(null), 300);
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
            onClick={startGame}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            🔄 لعبة جديدة
          </button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">🔨 اضرب الخلد</h1>
          <p className="text-gray-400">اضرب على الخلد بأسرع ما يمكن! لديك {GAME_DURATION} ثانية</p>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-6 mb-8 flex-wrap">
          <div className="bg-white/10 rounded-xl px-6 py-3 text-center">
            <div className="text-2xl font-bold text-yellow-400">{score}</div>
            <div className="text-sm text-gray-400">النقاط</div>
          </div>
          <div className="bg-white/10 rounded-xl px-6 py-3 text-center">
            <div className={`text-2xl font-bold ${timeLeft <= 5 ? 'text-red-400 animate-pulse' : 'text-cyan-400'}`}>
              {timeLeft}
            </div>
            <div className="text-sm text-gray-400">الوقت</div>
          </div>
          <div className="bg-white/10 rounded-xl px-6 py-3 text-center">
            <div className="text-2xl font-bold text-purple-400">{highScore}</div>
            <div className="text-sm text-gray-400">أعلى نتيجة</div>
          </div>
        </div>

        {/* Start Button */}
        {!isPlaying && timeLeft === GAME_DURATION && (
          <div className="text-center mb-8">
            <button
              onClick={startGame}
              className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl text-xl font-bold hover:scale-105 transition-transform shadow-lg"
            >
              🎯 ابدأ اللعب!
            </button>
          </div>
        )}

        {/* Game Over */}
        {!isPlaying && timeLeft === 0 && (
          <div className="text-center mb-8 p-6 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 rounded-2xl">
            <div className="text-4xl mb-2">⏰</div>
            <h2 className="text-2xl font-bold text-yellow-400">انتهى الوقت!</h2>
            <p className="text-gray-300 mt-2">حصلت على {score} نقطة</p>
            {score >= highScore && score > 0 && (
              <p className="text-green-400 mt-2 font-bold">🏆 رقم قياسي جديد!</p>
            )}
          </div>
        )}

        {/* Game Board */}
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
          {Array.from({ length: HOLES }).map((_, index) => (
            <button
              key={index}
              onClick={() => whackMole(index)}
              className={`relative aspect-square rounded-2xl border-2 transition-all duration-150 overflow-hidden ${
                moles[index]
                  ? 'border-yellow-400 bg-yellow-900/30 scale-95'
                  : 'border-white/10 bg-white/5'
              } ${hitEffect === index ? 'scale-90 bg-red-500/30 border-red-400' : ''} ${
                isPlaying && moles[index] ? 'cursor-pointer hover:scale-90' : ''
              }`}
            >
              {/* Hole */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1/3 bg-amber-900/50 rounded-t-full"></div>
              
              {/* Mole */}
              {moles[index] && (
                <div className={`absolute inset-0 flex items-center justify-center text-5xl transition-all duration-150 ${
                  hitEffect === index ? 'scale-50 opacity-0' : 'animate-bounce'
                }`}>
                  🐹
                </div>
              )}

              {/* Hit Effect */}
              {hitEffect === index && (
                <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-yellow-400 animate-ping">
                  💥
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
