const Section = ({ title, children }) => {
  return (
    <div className="section border border-pink-500 rounded-lg p-5 mb-5 bg-[#121212] text-white shadow-md">
      {title && (
        <h2 className="text-pink-400 text-xl mb-3 font-semibold">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
};

export default Section;
