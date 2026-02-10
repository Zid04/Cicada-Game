import { useState } from "react";
import WHEEL from "../components/layout/wheel";
import QUESTION from "../components/layout/question";
import ADVICE from "../components/layout/advice";
import { addToHistory } from "../utils/history"; 
import { useNavigate } from "react-router-dom";


export default function HomePage() {
  const navigate = useNavigate();

  const [selectedTheme, setSelectedTheme] = useState(null);
  const [score, setScore] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showAdvice, setShowAdvice] = useState(false);

  const handleThemeSelected = (theme) => {
    setSelectedTheme(theme);
    setShowQuiz(true);
  };

  const handleQuizEnd = (quizScore) => {
    setScore(quizScore);
    setShowQuiz(false);
     addToHistory({
    theme: selectedTheme.label,
    score: quizScore,
    total: selectedTheme.questions.length, // si tu as le total
  });

    // show advice only if player reached threshold (>=8)
    if (typeof quizScore === 'number' && quizScore >= 8) {
      setShowAdvice(true);
    } else {
      setShowAdvice(false);
    }
  };

  const handleCloseAdvice = () => {
    setShowAdvice(false);
    setSelectedTheme(null);
    setScore(0);
  };

  return (
    <div className="p-5  min-h-screen text-white flex flex-col items-center">
      <h1 className="text-3xl text-pink-400 mb-8">Welcome of Cicada-3032</h1>

      {/* Lien vers le scanner */}
      <button
        onClick={() => navigate("/scanner")}
        className="mb-8 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 border-2 border-cyan-300"
      >
        <span className="text-2xl">📷</span>
        <span>Open your QR Code Scanner</span>
      </button>


      {!showQuiz && !showAdvice && <WHEEL onThemeSelected={handleThemeSelected} />}

      {showQuiz && selectedTheme && (
        <div className="w-full flex flex-col items-center mt-5">
          <h2 className="text-xl mb-3">Thème : <span style={{ color: selectedTheme.color }}>{selectedTheme.label}</span></h2>
          <QUESTION theme={selectedTheme} onQuizEnd={handleQuizEnd} />
        </div>
      )}

      {showAdvice && <ADVICE theme={selectedTheme} onClose={handleCloseAdvice} />}

     
      {score > 0 && !showQuiz && !showAdvice && (
        <div className="mt-5 text-xl text-pink-400">your score : {score}</div>
      )}
    </div>
  );
}

