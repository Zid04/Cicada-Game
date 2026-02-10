import { useState } from "react";
import { Questions } from "../../data/questions";
import ADVICE from "./advice";
import { useNavigate } from "react-router-dom";

export default function QUESTION({ theme, onQuizEnd }) {
  const themeQuestions = Questions.filter(q => q.theme === theme.key);
  const navigate = useNavigate();

  const isLightColor = (hex) => {
    if (!hex) return false;
    const h = hex.replace('#', '');
    const r = parseInt(h.substring(0,2), 16);
    const g = parseInt(h.substring(2,4), 16);
    const b = parseInt(h.substring(4,6), 16);
    const luminance = (0.2126*r + 0.7152*g + 0.0722*b) / 255;
    return luminance > 0.65;
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [showAdvice, setShowAdvice] = useState(false);

  

  if (themeQuestions.length === 0) {
    return <p className="text-center mt-10">Aucune question pour ce thème.</p>;
  }

  const currentQuestion = themeQuestions[currentIndex];

  const handleAnswer = (idx) => {
    if (selectedAnswer !== null) return;

    const isCorrect = idx === currentQuestion.correct;
    setSelectedAnswer(idx);
    setFeedback(isCorrect ? "correct" : "wrong");

    const nextScore = isCorrect ? score + 1 : score;

    setTimeout(() => {
      setSelectedAnswer(null);
      setFeedback(null);

      // If it was the last question, end quiz and show advice if score >= 8
      if (currentIndex + 1 >= themeQuestions.length) {
        setScore(nextScore); 
        onQuizEnd(nextScore);

        // show advice only if player reached threshold (>=8)
        if (nextScore >= 8) {
          setShowAdvice(true);
        }
      } else {
        setScore(nextScore);
        setCurrentIndex(prev => prev + 1);
      }
    }, 600);
  };

  const handleCloseAdvice = () => {
    setShowAdvice(false);
    navigate("/"); // return to theme selection after advice
  };

  return (
    <>
      {/* Quiz */}
      <div className="flex justify-center mt-16 px-4 w-full max-w-3xl">
        <div key={currentIndex}
          className="w-full max-w-sm min-h-[560px]
                     rounded-3xl shadow-2xl
                     p-10 flex flex-col justify-between
                     transition-colors duration-500"
          style={{
            backgroundColor:
              feedback === "correct"
                ? "#26a254"
                : feedback === "wrong"
                ? "#e01212"
                : theme.color,
            color: isLightColor(
              feedback === "correct"
                ? "#26a254"
                : feedback === "wrong"
                ? "#e01212"
                : theme.color
            )
              ? '#000000'
              : '#ffffff'
          }}
        >
          {/* QUESTION */}
          <h2 className="text-2xl font-bold text-center mb-12">
            {currentQuestion.question}
          </h2>

          {/* answer */}
          <div className="flex flex-col gap-6">
            {currentQuestion.options.map((opt, idx) => {
              let btnColor = "bg-gray-900 hover:bg-gray-800 rounded-lg";

              if (selectedAnswer === idx) {
                btnColor =
                  feedback === "correct"
                    ? "bg-green-800"
                    : "bg-red-800";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={selectedAnswer !== null}
                  className={`${btnColor}
                    py-10 px-6 rounded-xl min-h-[100px] flex items-center justify-center
                    text-base font-semibold text-white
                    border-white rounded-lg
                    transition-all hover:scale-105`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* PROGRESSION */}
          <p
            className="text-base opacity-90 text-center"
            style={{ color: '#ffffff', fontWeight: 600 }}
            aria-live="polite"
          >
            Question {currentIndex + 1} / {themeQuestions.length}
          </p>
          
        </div>
      </div>

      {/* Pop-up ADVICE */}
      {showAdvice && <ADVICE theme={theme.key} onClose={handleCloseAdvice} />}
    </>
  );
}
