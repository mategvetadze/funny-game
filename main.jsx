import { useState } from 'react';
import { Coins, Eye, RotateCw } from 'lucide-react';

// List of fun questions for the game
const questions = [
  "Who is the tallest person in this group?",
  "Who is most likely to sleep through their alarm?",
  "Who would survive the longest in the wilderness?",
  "Who is most likely to become famous?",
  "Who is the best dancer in the group?",
  "Who is most likely to win a reality TV show?",
  "Who is most likely to become a CEO?",
  "Who has the best style in this group?",
  "Who is most likely to adopt a pet on impulse?",
  "Who would win in a karaoke contest?",
  "Who is most likely to travel the world?",
  "Who is most likely to become a millionaire?",
  "Who would make the best superhero?",
  "Who is most likely to start their own business?",
  "Who would win in a cooking contest?"
];

export default function MemoryGame() {
  const [gameState, setGameState] = useState('initial'); // initial, questionRevealed, coinFlipped
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [coinResult, setCoinResult] = useState(null); // null, 'heads', 'tails'

  const revealQuestion = () => {
    // Pick a random question from the list
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex]);
    setGameState('questionRevealed');
    setCoinResult(null);
  };

  const flipCoin = () => {
    // 50/50 chance for heads or tails
    const result = Math.random() < 0.5 ? 'heads' : 'tails';
    setCoinResult(result);
    setGameState('coinFlipped');
  };

  const nextRound = () => {
    setGameState('initial');
    setCurrentQuestion('');
    setCoinResult(null);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-6 w-full max-w-md mx-auto bg-gray-50 rounded-lg shadow-lg min-h-[70vh]">
      <h1 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">Secret Question Memory Game</h1>

      {gameState === 'initial' && (
        <div className="flex flex-col items-center w-full flex-grow justify-center">
          <p className="text-center text-sm sm:text-base mb-6 px-2">
            Press the button to reveal a question. Answer it by naming someone in your group, then flip the coin.
            If it's tails, you must reveal what the question was. If it's heads, keep it secret!
          </p>
          <button
            onClick={revealQuestion}
            className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white py-4 px-6 rounded-lg font-semibold w-full max-w-xs transition-colors text-lg touch-manipulation"
          >
            <Eye size={20} />
            Reveal Question
          </button>
        </div>
      )}

      {gameState === 'questionRevealed' && (
        <div className="flex flex-col items-center w-full flex-grow justify-center">
          <div className="bg-white p-4 border-2 border-blue-300 rounded-lg mb-6 w-full">
            <h2 className="text-lg sm:text-xl font-semibold mb-2 text-center">Question:</h2>
            <p className="text-center text-base sm:text-lg">{currentQuestion}</p>
          </div>
          <p className="text-center text-sm sm:text-base mb-6">
            Now name someone as your answer, then flip the coin!
          </p>
          <button
            onClick={flipCoin}
            className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white py-4 px-6 rounded-lg font-semibold w-full max-w-xs transition-colors text-lg touch-manipulation"
          >
            <Coins size={20} />
            Flip Coin
          </button>
        </div>
      )}

      {gameState === 'coinFlipped' && (
        <div className="flex flex-col items-center w-full flex-grow justify-center">
          <div className={`p-5 sm:p-6 rounded-full mb-4 sm:mb-6 ${coinResult === 'heads' ? 'bg-green-100 border-2 border-green-500' : 'bg-red-100 border-2 border-red-500'}`}>
            <h2 className="text-xl sm:text-2xl font-bold text-center">
              {coinResult === 'heads' ? 'HEADS' : 'TAILS'}
            </h2>
          </div>

          <div className="bg-white p-4 border-2 border-gray-300 rounded-lg mb-6 w-full">
            <h2 className="text-lg sm:text-xl font-semibold mb-2 text-center">Result:</h2>
            <p className="text-center text-base sm:text-lg">
              {coinResult === 'heads' ?
                'Keep the question secret! 🤫' :
                'You must reveal the question! 📢'}
            </p>
            {coinResult === 'tails' && (
              <p className="text-center mt-2 font-medium">{currentQuestion}</p>
            )}
          </div>

          <button
            onClick={nextRound}
            className="flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 active:bg-purple-700 text-white py-4 px-6 rounded-lg font-semibold w-full max-w-xs transition-colors text-lg touch-manipulation"
          >
            <RotateCw size={20} />
            Next Round
          </button>
        </div>
      )}
    </div>
  );
}