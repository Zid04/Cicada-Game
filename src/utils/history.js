const STORAGE_KEY = "quizHistory";

export const getHistory = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

export const addToHistory = ({ theme, score, total }) => {
  const history = getHistory();

  const newEntry = {
    theme,
    score,
    total,
    date: new Date().toLocaleString()
  };

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([...history, newEntry])
  );
};

export const clearHistory = () => {
  localStorage.removeItem(STORAGE_KEY);
};
