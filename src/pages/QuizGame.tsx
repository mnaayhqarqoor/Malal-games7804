import { useState } from 'react';
import { Link } from 'react-router-dom';

interface Question {
  question: string;
  options: string[];
  correct: number;
  category: string;
}

const questions: Question[] = [
  { question: 'ما هي عاصمة فرنسا؟', options: ['لندن', 'باريس', 'برلين', 'مدريد'], correct: 1, category: 'جغرافيا' },
  { question: 'كم عدد كواكب المجموعة الشمسية؟', options: ['7', '8', '9', '10'], correct: 1, category: 'علوم' },
  { question: 'ما هو أكبر محيط في العالم؟', options: ['الأطلسي', 'الهندي', 'الهادئ', 'المتجمد'], correct: 2, category: 'جغرافيا' },
  { question: 'من اخترع المصباح الكهربائي؟', options: ['نيوتن', 'أينشتاين', 'إديسون', 'تسلا'], correct: 2, category: 'تاريخ' },
  { question: 'ما هي أطول نهر في العالم؟', options: ['النيل', 'الأمازون', 'المسيسيبي', 'اليانغتسي'], correct: 0, category: 'جغرافيا' },
  { question: 'كم عدد أضلاع المثلث؟', options: ['2', '3', '4', '5'], correct: 1, category: 'رياضيات' },
  { question: 'ما هي اللغة الأكثر تحدثاً في العالم؟', options: ['الإنجليزية', 'الإسبانية', 'الماندرين', 'العربية'], correct: 2, category: 'معلومات عامة' },
  { question: 'ما هو الحيوان الأسرع على وجه الأرض؟', options: ['الأسد', 'الفهد', 'الغزال', 'النسر'], correct: 1, category: 'حيوانات' },
  { question: 'في أي سنة هبط الإنسان على القمر؟', options: ['1965', '1969', '1972', '1975'], correct: 1, category: 'تاريخ' },
  { question: 'ما هو العنصر الكيميائي الأكثر وفرة في الكون؟', options: ['الأكسجين', 'الكربون', 'الهيدروجين', 'الهيليوم'], correct: 2, category: 'علوم' },
  { question: 'كم عدد أيام السنة الكبيسة؟', options: ['364', '365', '366', '367'], correct: 2, category: 'معلومات عامة' },
  { question: 'ما هي أصغر دولة في العالم؟', options: ['موناكو', 'الفاتيكان', 'سان مارينو', 'مالطا'], correct: 1, category: 'جغرافيا' },
];

export default function QuizGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);

  const startGame = () => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5).slice(0, 8);
    setShuffledQuestions(shuffled);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameFinished(false);
  };

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);

    if (index === shuffledQuestions[currentQuestion].correct) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestion < shuffledQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setGameFinished(true);
      }
    }, 1500);
  };

  const getScoreMessage = () => {
    const percentage = (score / shuffledQuestions.length) * 100;
    if (percentage >= 80) return '🏆 ممتاز! أنت عبقري!';
    if (percentage >= 60) return '👏 جيد جداً!';
    if (percentage >= 40) return '👍 لا بأس، حاول مرة أخرى!';
    return '📚 تحتاج تدرس أكثر!';
  };

  if (shuffledQuestions.length === 0) {
    return (
      <div className="text-white py-8 px-4 min-h-screen flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="text-7xl mb-6">🧪</div>
          <h1 className="text-4xl font-bold mb-4">اختبر معلوماتك</h1>
          <p className="text-gray-400 mb-8 text-lg">أسئلة متنوعة في مواضيع مختلفة<br />هل أنت مستعد للتحدي؟</p>
          <button
            onClick={startGame}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-lg font-bold hover:scale-105 transition-transform shadow-lg"
          >
            🚀 ابدأ الاختبار
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

  if (gameFinished) {
    return (
      <div className="text-white py-8 px-4 min-h-screen flex items-center justify-center" dir="rtl">
        <div className="text-center max-w-md mx-auto">
          <div className="text-7xl mb-6">
            {score >= shuffledQuestions.length * 0.8 ? '🏆' : score >= shuffledQuestions.length * 0.5 ? '⭐' : '💪'}
          </div>
          <h2 className="text-3xl font-bold mb-4">انتهى الاختبار!</h2>
          <p className="text-xl text-gray-300 mb-2">{getScoreMessage()}</p>
          <div className="bg-white/10 rounded-xl p-6 mb-8">
            <div className="text-4xl font-bold text-purple-400">{score}/{shuffledQuestions.length}</div>
            <div className="text-gray-400 mt-2">إجابة صحيحة</div>
          </div>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={startGame}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-bold transition-colors"
            >
              🔄 حاول مرة أخرى
            </button>
            <Link to="/games" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition-colors">
              العودة للألعاب
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const question = shuffledQuestions[currentQuestion];

  return (
    <div className="text-white py-8 px-4 min-h-screen" dir="rtl">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/games" className="text-gray-400 hover:text-white transition-colors">
            → العودة للألعاب
          </Link>
          <div className="bg-white/10 rounded-lg px-4 py-2">
            <span className="text-purple-400 font-bold">{currentQuestion + 1}</span>
            <span className="text-gray-400"> / {shuffledQuestions.length}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/10 rounded-full h-2 mb-8">
          <div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentQuestion + 1) / shuffledQuestions.length) * 100}%` }}
          />
        </div>

        {/* Score */}
        <div className="text-center mb-6">
          <span className="text-green-400 font-bold">النقاط: {score}</span>
        </div>

        {/* Question */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-6">
          <div className="text-sm text-purple-400 mb-2">📂 {question.category}</div>
          <h2 className="text-2xl font-bold">{question.question}</h2>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 gap-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={showResult}
              className={`p-4 rounded-xl text-right text-lg transition-all duration-300 ${
                showResult
                  ? index === question.correct
                    ? 'bg-green-500/30 border-2 border-green-400 text-green-300'
                    : index === selectedAnswer
                    ? 'bg-red-500/30 border-2 border-red-400 text-red-300'
                    : 'bg-white/5 border border-white/10 text-gray-400'
                  : 'bg-white/5 border border-white/10 hover:bg-white/15 hover:border-purple-400/50 cursor-pointer'
              }`}
            >
              <span className="ml-3 text-gray-500">{['أ', 'ب', 'ج', 'د'][index]}</span>
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
