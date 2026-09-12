import { Link } from 'react-router-dom';

export default function Games() {
  const games = [
    {
      name: 'لعبة الذاكرة',
      emoji: '🃏',
      path: '/games/memory',
      color: 'from-blue-500 to-cyan-500',
      description: 'اقلب البطاقات واعثر على الأزواج المتطابقة. تحدّى ذاكرتك!',
      difficulty: 'سهل',
      category: 'ذهن',
    },
    {
      name: 'لعبة الثعبان',
      emoji: '🐍',
      path: '/games/snake',
      color: 'from-green-500 to-emerald-500',
      description: 'تحكم بالثعبان وكل الطعام. لا تصدم بنفسك!',
      difficulty: 'متوسط',
      category: 'سرعة',
    },
    {
      name: 'إكس أو',
      emoji: '❌',
      path: '/games/tictactoe',
      color: 'from-red-500 to-orange-500',
      description: 'اللعبة الكلاسيكية! العب ضد الكمبيوتر وحاول الفوز.',
      difficulty: 'سهل',
      category: 'استراتيجية',
    },
    {
      name: 'اختبر معلوماتك',
      emoji: '🧪',
      path: '/games/quiz',
      color: 'from-purple-500 to-pink-500',
      description: 'أسئلة متنوعة في مواضيع مختلفة. كم نقطة تقدر تجمع؟',
      difficulty: 'متوسط',
      category: 'معلومات',
    },
    {
      name: 'اضرب الخلد',
      emoji: '🔨',
      path: '/games/whack-a-mole',
      color: 'from-yellow-500 to-amber-500',
      description: 'الخلد يطلع من الحفر! اضغط عليه بأسرع ما يمكن.',
      difficulty: 'سهل',
      category: 'سرعة',
    },
    {
      name: 'تطابق الألوان',
      emoji: '🎨',
      path: '/games/color-match',
      color: 'from-indigo-500 to-violet-500',
      description: 'هل اللون يطابق الكلمة؟ اختبر سرعة بديהتك!',
      difficulty: 'صعب',
      category: 'تركيز',
    },
  ];

  return (
    <div className="text-white py-12 px-4" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              🎮 جميع الألعاب
            </span>
          </h1>
          <p className="text-gray-400 text-lg">اختر لعبتك المفضلة وابدأ المتعة!</p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game, index) => (
            <Link
              key={index}
              to={game.path}
              className="group relative overflow-hidden rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-10 group-hover:opacity-25 transition-opacity duration-500`}></div>
              
              {/* Content */}
              <div className="relative p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                    {game.emoji}
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-white/10 rounded-full text-xs">
                      {game.category}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      game.difficulty === 'سهل' ? 'bg-green-500/20 text-green-300' :
                      game.difficulty === 'متوسط' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      {game.difficulty}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-2">{game.name}</h3>
                <p className="text-gray-400 mb-6">{game.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors">
                    <span>العب الآن</span>
                    <span className="group-hover:-translate-x-1 transition-transform">←</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
