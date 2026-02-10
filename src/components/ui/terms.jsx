const Term = ({ title, children }) => {
  return (
    <div className="term border border-pink-500 rounded-lg p-4 mb-4 bg-[#1a1a1a] text-white shadow-sm transition-colors hover:bg-gradient-to-r hover:from-[#1a1a1a] hover:via-[#ff4d8d] hover:to-[#121212]">
      <h3 className="text-pink-400 font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-200">{children}</p>
    </div>
  );
};

export default Term;
