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
      description: 'تحكم بالثعبان وكل الطعام. لا تصدم بنفسك! استخدم الأسهم.',
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
      description: 'هل اللون يطابق الكلمة؟ اختبر سرعة بديهتك!',
      difficulty: 'صعب',
      category: 'تركيز',
    },
    {
      name: 'خمّن الرقم',
      emoji: '🔢',
      path: '/games/guess-number',
      color: 'from-teal-500 to-cyan-500',
      description: 'فكر برقم عشوائي وحاول تخمينه مع تلميحات حر/بارد!',
      difficulty: 'سهل',
      category: 'ذكاء',
    },
    {
      name: 'سيمون يقول',
      emoji: '🧠',
      path: '/games/simon-says',
      color: 'from-rose-500 to-pink-500',
      description: 'تذكر تسلسل الألوان وكرره! كل مستوى أصعب من السابق.',
      difficulty: 'صعب',
      category: 'ذاكرة',
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
          <p className="text-gray-400 text-lg">اختر لعبتك المفضلة وابدأ المتعة! ({games.length} لعبة متاحة)</p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {games.map((game, index) => (
            <Link
              key={index}
              to={game.path}
              className="group relative overflow-hidden rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-10 group-hover:opacity-25 transition-opacity duration-500`}></div>
              
              {/* Content */}
              <div className="relative p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
                    {game.emoji}
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="px-2 py-0.5 bg-white/10 rounded-full text-xs text-center">
                      {game.category}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs text-center ${
                      game.difficulty === 'سهل' ? 'bg-green-500/20 text-green-300' :
                      game.difficulty === 'متوسط' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      {game.difficulty}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-2">{game.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{game.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors text-sm">
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
