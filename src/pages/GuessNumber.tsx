import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function GuessNumber() {
  const [targetNumber, setTargetNumber] = useState(0);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState<{ value: number; hint: string }[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [range, setRange] = useState<{ min: number; max: number }>({ min: 1, max: 100 });
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');

  const difficulties = {
    easy: { min: 1, max: 50, label: 'سهل (1-50)', emoji: '😊' },
    medium: { min: 1, max: 100, label: 'متوسط (1-100)', emoji: '😎' },
    hard: { min: 1, max: 500, label: 'صعب (1-500)', emoji: '🤯' },
  };

  const startGame = () => {
    const { min, max } = difficulties[difficulty];
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    setTargetNumber(random);
    setRange({ min, max });
    setAttempts([]);
    setGuess('');
    setGameStarted(true);
    setGameWon(false);
  };

  const handleGuess = () => {
    const num = parseInt(guess);
    if (isNaN(num) || num < range.min || num > range.max) return;

    let hint = '';
    const diff = Math.abs(num - targetNumber);
    const rangeSize = range.max - range.min;

    if (num === targetNumber) {
      hint = '🎉 صحيح!';
      setGameWon(true);
    } else if (diff <= rangeSize * 0.05) {
      hint = num < targetNumber ? '🔥 🔥 🔥 قريب جداً! أعلى ↑' : '🔥 🔥 🔥 قريب جداً! أسفل ↓';
    } else if (diff <= rangeSize * 0.15) {
      hint = num < targetNumber ? '🔥 🔥 قريب! أعلى ↑' : '🔥 🔥 قريب! أسفل ↓';
    } else if (diff <= rangeSize * 0.3) {
      hint = num < targetNumber ? '🔥 دافئ! أعلى ↑' : '🔥 دافئ! أسفل ↓';
    } else {
      hint = num < targetNumber ? '❄️ بارد! أعلى بكثير ↑' : '❄️ بارد! أسفل بكثير ↓';
    }

    setAttempts(prev => [{ value: num, hint }, ...prev]);
    setGuess('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !gameWon) {
      handleGuess();
    }
  };

  const getScoreMessage = () => {
    const count = attempts.length;
    if (count <= 3) return '🏆 خرافي! أنت عبقري!';
    if (count <= 5) return '⭐ ممتاز!';
    if (count <= 7) return '👍 جيد!';
    if (count <= 10) return '👌 لا بأس';
    return '📚 حاول مرة أخرى!';
  };

  if (!gameStarted) {
    return (
      <div className="text-white py-8 px-4 min-h-screen flex items-center justify-center" dir="rtl">
        <div className="text-center max-w-md mx-auto">
          <div className="text-7xl mb-6">🔢</div>
          <h1 className="text-4xl font-bold mb-4">خمّن الرقم</h1>
          <p className="text-gray-400 mb-8 text-lg">
            سأفكر برقم وأنت حاول تخمنه!<br />
            سأعطيك تلميحات: 🔥 = قريب، ❄️ = بعيد
          </p>

          {/* Difficulty Selection */}
          <div className="mb-8">
            <p className="text-gray-300 mb-3">اختر المستوى:</p>
            <div className="flex gap-3 justify-center flex-wrap">
              {(Object.keys(difficulties) as Array<keyof typeof difficulties>).map((key) => (
                <button
                  key={key}
                  onClick={() => setDifficulty(key)}
                  className={`px-5 py-3 rounded-xl transition-all ${
                    difficulty === key
                      ? 'bg-purple-600 border-2 border-purple-400 scale-105'
                      : 'bg-white/10 border border-white/20 hover:bg-white/20'
                  }`}
                >
                  <span className="text-xl">{difficulties[key].emoji}</span>
                  <span className="block text-sm mt-1">{difficulties[key].label}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={startGame}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-lg font-bold hover:scale-105 transition-transform shadow-lg"
          >
            🚀 ابدأ اللعب
          </button>
          <div className="mt-6">
            <Link to="/games" className="text-gray-400 hover:text-white transition-colors">
              → العودة للألعاب
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-white py-8 px-4 min-h-screen" dir="rtl">
      <div className="max-w-2xl mx-auto">
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
          <h1 className="text-4xl font-bold mb-2">🔢 خمّن الرقم</h1>
          <p className="text-gray-400">الرقم بين {range.min} و {range.max}</p>
        </div>

        {/* Win Screen */}
        {gameWon && (
          <div className="text-center mb-8 p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl">
            <div className="text-5xl mb-3">🎊</div>
            <h2 className="text-2xl font-bold text-green-400 mb-2">مبروك! وجدت الرقم!</h2>
            <p className="text-gray-300 text-lg">الرقم كان <span className="text-green-400 font-bold text-2xl">{targetNumber}</span></p>
            <p className="text-gray-400 mt-2">خمّنته في {attempts.length} محاولة</p>
            <p className="text-xl mt-3">{getScoreMessage()}</p>
          </div>
        )}

        {/* Input */}
        {!gameWon && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
            <div className="flex gap-3">
              <input
                type="number"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`أدخل رقم (${range.min}-${range.max})`}
                min={range.min}
                max={range.max}
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-lg placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                autoFocus
              />
              <button
                onClick={handleGuess}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-bold transition-colors"
              >
                تخمين
              </button>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="flex justify-center gap-6 mb-6">
          <div className="bg-white/10 rounded-xl px-6 py-3 text-center">
            <div className="text-2xl font-bold text-cyan-400">{attempts.length}</div>
            <div className="text-sm text-gray-400">المحاولات</div>
          </div>
          <div className="bg-white/10 rounded-xl px-6 py-3 text-center">
            <div className="text-2xl font-bold text-yellow-400">{range.max - range.min}</div>
            <div className="text-sm text-gray-400">النطاق</div>
          </div>
        </div>

        {/* Attempts History */}
        {attempts.length > 0 && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <h3 className="text-lg font-bold mb-3 text-center">📋 سجل التخمينات</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {attempts.map((attempt, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    attempt.hint.includes('صحيح') ? 'bg-green-500/20 border border-green-500/30' : 'bg-white/5'
                  }`}
                >
                  <span className="text-xl font-bold">{attempt.value}</span>
                  <span className="text-sm">{attempt.hint}</span>
                  <span className="text-gray-500 text-sm">#{attempts.length - index}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
