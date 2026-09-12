import { Link } from 'react-router-dom';

export default function Home() {
  const features = [
    { icon: '🧠', title: 'ألعاب ذهنية', desc: 'تحدّي عقلك مع ألعاب الذاكرة والتفكير' },
    { icon: '⚡', title: 'ألعاب سرعة', desc: 'اختبر سرعة ردود أفعالك' },
    { icon: '🎯', title: 'ألعاب تركيز', desc: 'حسّن مستوى تركيزك' },
    { icon: '😂', title: 'مرح بلا حدود', desc: 'استمتع بألعاب ممتعة ومسلية' },
  ];

  const popularGames = [
    { name: 'لعبة الذاكرة', emoji: '🃏', path: '/games/memory', color: 'from-blue-500 to-cyan-500' },
    { name: 'لعبة الثعبان', emoji: '🐍', path: '/games/snake', color: 'from-green-500 to-emerald-500' },
    { name: 'إكس أو', emoji: '❌', path: '/games/tictactoe', color: 'from-red-500 to-orange-500' },
    { name: 'اختبر معلوماتك', emoji: '🧪', path: '/games/quiz', color: 'from-purple-500 to-pink-500' },
    { name: 'اضرب الخلد', emoji: '🔨', path: '/games/whack-a-mole', color: 'from-yellow-500 to-amber-500' },
    { name: 'تطابق الألوان', emoji: '🎨', path: '/games/color-match', color: 'from-indigo-500 to-violet-500' },
    { name: 'خمّن الرقم', emoji: '🔢', path: '/games/guess-number', color: 'from-teal-500 to-cyan-500' },
    { name: 'سيمون يقول', emoji: '🧠', path: '/games/simon-says', color: 'from-rose-500 to-pink-500' },
  ];

  return (
    <div className="text-white" dir="rtl">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-600/20 to-transparent"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="text-7xl mb-6 animate-bounce">🎮</div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
              اقتل الملل
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            منصة ألعاب مجانية تلعبها مباشرة في المتصفح. ألعاب ممتعة لتحدي عقلك وقتل الملل! 🚀
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/games"
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-lg font-bold hover:scale-105 transition-transform shadow-lg shadow-purple-500/30"
            >
              🎮 ابدأ اللعب الآن
            </Link>
            <a
              href="#games"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-lg font-bold hover:bg-white/20 transition-all"
            >
              📋 تصفح الألعاب
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              ليه تختار منصتنا؟
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 hover:scale-105 transition-all duration-300"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Games Section */}
      <section id="games" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              🔥 الألعاب الشهيرة
            </span>
          </h2>
          <p className="text-gray-400 text-center mb-12">اختر لعبتك المفضلة وابدأ المتعة</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularGames.map((game, index) => (
              <Link
                key={index}
                to={game.path}
                className="group relative overflow-hidden rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-20 group-hover:opacity-40 transition-opacity`}></div>
                <div className="relative p-8 text-center">
                  <div className="text-6xl mb-4 group-hover:scale-125 transition-transform duration-300">{game.emoji}</div>
                  <h3 className="text-xl font-bold">{game.name}</h3>
                  <div className="mt-4 inline-block px-4 py-2 bg-white/10 rounded-full text-sm group-hover:bg-white/20 transition-colors">
                    العب الآن ←
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-purple-400">8</div>
                <div className="text-gray-400 text-sm mt-1">ألعاب متاحة</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-pink-400">100%</div>
                <div className="text-gray-400 text-sm mt-1">مجاني</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-cyan-400">0</div>
                <div className="text-gray-400 text-sm mt-1">تحميل مطلوب</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-yellow-400">∞</div>
                <div className="text-gray-400 text-sm mt-1">ساعات مرح</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
