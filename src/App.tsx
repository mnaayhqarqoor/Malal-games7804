import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Games from './pages/Games';
import MemoryGame from './pages/MemoryGame';
import SnakeGame from './pages/SnakeGame';
import TicTacToe from './pages/TicTacToe';
import QuizGame from './pages/QuizGame';
import WhackAMole from './pages/WhackAMole';
import ColorMatch from './pages/ColorMatch';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/memory" element={<MemoryGame />} />
            <Route path="/games/snake" element={<SnakeGame />} />
            <Route path="/games/tictactoe" element={<TicTacToe />} />
            <Route path="/games/quiz" element={<QuizGame />} />
            <Route path="/games/whack-a-mole" element={<WhackAMole />} />
            <Route path="/games/color-match" element={<ColorMatch />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
