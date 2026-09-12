import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const emojis = ['🎮', '🎯', '🎲', '🎪', '🎨', '🎭', '🎬', '🎵'];

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const initializeGame = () => {
    const doubledEmojis = [...emojis, ...emojis];
    const shuffled = doubledEmojis
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setGameWon(false);
    setIsChecking(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (matches === emojis.length) {
      setGameWon(true);
    }
  }, [matches]);

  const handleCardClick = (id: number) => {
    if (isChecking) return;
    if (flippedCards.length === 2) return;
    if (cards[id].isFlipped || cards[id].isMatched) return;

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      setIsChecking(true);

      if (newCards[newFlipped[0]].emoji === newCards[newFlipped[1]].emoji) {
        newCards[newFlipped[0]].isMatched = true;
        newCards[newFlipped[1]].isMatched = true;
        setCards(newCards);
        setMatches((prev) => prev + 1);
        setFlippedCards([]);
        setIsChecking(false);
      } else {
        setTimeout(() => {
          newCards[newFlipped[0]].isFlipped = false;
          newCards[newFlipped[1]].isFlipped = false;
          setCards(newCards);
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      }
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
            onClick={initializeGame}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            🔄 لعبة جديدة
          </button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">🃏 لعبة الذاكرة</h1>
          <p className="text-gray-400">اقلب البطاقات واعثر على الأزواج المتطابقة</p>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8 mb-8">
          <div className="bg-white/10 rounded-xl px-6 py-3 text-center">
            <div className="text-2xl font-bold text-purple-400">{moves}</div>
            <div className="text-sm text-gray-400">المحاولات</div>
          </div>
          <div className="bg-white/10 rounded-xl px-6 py-3 text-center">
            <div className="text-2xl font-bold text-green-400">{matches}/{emojis.length}</div>
            <div className="text-sm text-gray-400">التطابقات</div>
          </div>
        </div>

        {/* Win Message */}
        {gameWon && (
          <div className="text-center mb-8 p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl">
            <div className="text-4xl mb-2">🎉</div>
            <h2 className="text-2xl font-bold text-green-400">مبروك! فزت!</h2>
            <p className="text-gray-300 mt-2">أنهيت اللعبة في {moves} محاولة</p>
          </div>
        )}

        {/* Game Board */}
        <div className="grid grid-cols-4 gap-3 max-w-lg mx-auto">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`aspect-square rounded-xl text-3xl md:text-4xl flex items-center justify-center transition-all duration-300 transform ${
                card.isFlipped || card.isMatched
                  ? 'bg-white/20 border-2 border-purple-400 rotate-0 scale-100'
                  : 'bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 hover:scale-105 cursor-pointer'
              } ${card.isMatched ? 'opacity-70 border-green-400' : ''}`}
            >
              {card.isFlipped || card.isMatched ? card.emoji : '❓'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
