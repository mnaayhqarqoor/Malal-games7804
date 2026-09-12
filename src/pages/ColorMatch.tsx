import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const COLORS = [
  { name: 'أحمر', hex: '#ef4444', text: 'red' },
  { name: 'أزرق', hex: '#3b82f6', text: 'blue' },
  { name: 'أخضر', hex: '#22c55e', text: 'green' },
  { name: 'أصفر', hex: '#eab308', text: 'yellow' },
  { name: 'بنفسجي', hex: '#a855f7', text: 'purple' },
  { name: 'برتقالي', hex: '#f97316', text: 'orange' },
];

const GAME_DURATION = 30;

export default function ColorMatch() {
  const [displayColor, setDisplayColor] = useState(COLORS[0]);
  const [displayText, setDisplayText] = useState(COLORS[0]);
  const [isMatch, setIsMatch] = useState(true);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const timerRef = useRef<number | null>(null);

  const generateRound = () => {
    const colorIndex = Math.floor(Math.random() * COLORS.length);
    const textIndex = Math.floor(Math.random() * COLORS.length);
    const shouldMatch = Math.random() > 0.5;

    setDisplayColor(COLORS[colorIndex]);
    if (shouldMatch) {
      setDisplayText(COLORS[colorIndex]);
      setIsMatch(true);
    } else {
      let newTextIndex = textIndex;
      while (newTextIndex === colorIndex) {
        newTextIndex = Math.floor(Math.random() * COLORS.length);
      }
      setDisplayText(COLORS[newTextIndex]);
      setIsMatch(false);
    }
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setIsPlaying(true);
    setStreak(0);
    generateRound();
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
    if (!isPlaying && timeLeft === 0 && score > highScore) {
      setHighScore(score);
    }
  }, [timeLeft, isPlaying, score, highScore]);

  const handleAnswer = (answer: boolean) => {
    if (!isPlaying) return;

    const isCorrect = answer === isMatch;
    if (isCorrect) {
      setScore(prev => prev + 1 + Math.floor(streak / 3));
      setStreak(prev => prev + 1);
      setFeedback('correct');
    } else {
      setStreak(0);
      setFeedback('wrong');
    }

    setTimeout(() => {
      setFeedback(null);
      generateRound();
    }, 300);
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
          <h1 className="text-4xl font-bold mb-2">🎨 تطابق الألوان</h1>
          <p className="text-gray-400">هل لون النص يطابق معنى الكلمة؟ أجب بسرعة!</p>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-6 mb-8 flex-wrap">
          <div className="bg-white/10 rounded-xl px-6 py-3 text-center">
            <div className="text-2xl font-bold text-green-400">{score}</div>
            <div className="text-sm text-gray-400">النقاط</div>
          </div>
          <div className="bg-white/10 rounded-xl px-6 py-3 text-center">
            <div className={`text-2xl font-bold ${timeLeft <= 5 ? 'text-red-400 animate-pulse' : 'text-cyan-400'}`}>
              {timeLeft}
            </div>
            <div className="text-sm text-gray-400">الوقت</div>
          </div>
          <div className="bg-white/10 rounded-xl px-6 py-3 text-center">
            <div className="text-2xl font-bold text-orange-400">{streak}🔥</div>
            <div className="text-sm text-gray-400">سلسلة</div>
          </div>
          <div className="bg-white/10 rounded-xl px-6 py-3 text-center">
            <div className="text-2xl font-bold text-purple-400">{highScore}</div>
            <div className="text-sm text-gray-400">أعلى نتيجة</div>
          </div>
        </div>

        {/* Start Screen */}
        {!isPlaying && timeLeft === GAME_DURATION && (
          <div className="text-center">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8 max-w-md mx-auto">
              <h3 className="text-xl font-bold mb-4">كيف تلعب؟</h3>
              <div className="space-y-3 text-gray-300 text-right">
                <p>📝 ستظهر كلمة بلون معين</p>
                <p>🤔 إذا كان <strong>لون الحبر</strong> يطابق <strong>معنى الكلمة</strong> → اضغط "نعم"</p>
                <p>🚫 إذا كان <strong>لون الحبر</strong> لا يطابق <strong>معنى الكلمة</strong> → اضغط "لا"</p>
                <p>⚡ كلما أجبت أسرع وكلما زادت سلسلتك، زادت نقاطك!</p>
              </div>
            </div>
            <button
              onClick={startGame}
              className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-xl text-xl font-bold hover:scale-105 transition-transform shadow-lg"
            >
              🎯 ابدأ اللعب!
            </button>
          </div>
        )}

        {/* Game Over */}
        {!isPlaying && timeLeft === 0 && (
          <div className="text-center mb-8 p-6 bg-gradient-to-r from-indigo-500/20 to-violet-500/20 border border-indigo-500/30 rounded-2xl">
            <div className="text-4xl mb-2">⏰</div>
            <h2 className="text-2xl font-bold text-indigo-400">انتهى الوقت!</h2>
            <p className="text-gray-300 mt-2">حصلت على {score} نقطة</p>
            {score >= highScore && score > 0 && (
              <p className="text-green-400 mt-2 font-bold">🏆 رقم قياسي جديد!</p>
            )}
          </div>
        )}

        {/* Game Area */}
        {isPlaying && (
          <div className="text-center">
            <div
              className={`relative p-12 rounded-3xl mb-8 transition-all duration-200 ${
                feedback === 'correct' ? 'bg-green-500/20 border-2 border-green-400 scale-105' :
                feedback === 'wrong' ? 'bg-red-500/20 border-2 border-red-400 scale-95' :
                'bg-white/5 border border-white/10'
              }`}
            >
              <p className="text-sm text-gray-400 mb-4">هل لون النص يطابق معنى الكلمة؟</p>
              <div
                className="text-6xl md:text-8xl font-bold transition-all duration-200"
                style={{ color: displayColor.hex }}
              >
                {displayText.name}
              </div>
              {feedback === 'correct' && (
                <div className="absolute top-4 left-4 text-3xl animate-bounce">✅</div>
              )}
              {feedback === 'wrong' && (
                <div className="absolute top-4 left-4 text-3xl animate-bounce">❌</div>
              )}
            </div>

            {/* Answer Buttons */}
            <div className="flex gap-6 justify-center">
              <button
                onClick={() => handleAnswer(true)}
                className="px-10 py-5 bg-green-600 hover:bg-green-700 rounded-2xl text-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-green-500/30"
              >
                ✅ نعم
              </button>
              <button
                onClick={() => handleAnswer(false)}
                className="px-10 py-5 bg-red-600 hover:bg-red-700 rounded-2xl text-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-red-500/30"
              >
                ❌ لا
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
