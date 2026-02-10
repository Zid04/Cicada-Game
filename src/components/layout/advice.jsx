import { Advices } from "../../data/advices.js";
import { IMAGES } from "../../data/images.js";

export default function ADVICE({ theme, onClose }) {

  const themeKey = theme && typeof theme === 'object' ? theme.key : theme;

  const advice = Advices[themeKey];
  const images = IMAGES[themeKey];

  if (!advice) return null;

  const adviceText = advice[Math.floor(Math.random() * advice.length)];
  const image = images ? images[Math.floor(Math.random() * images.length)] : null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="text-white p-6 rounded-2xl shadow-xl max-w-md w-full relative">

        {/* close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-400 text-xl"
        >
          ✕
        </button>

        {/* Image */}
        {image && (
          <img
            src={image}
            alt="cybersécurité"
            className="mx-auto rounded-lg mb-4"
          />
        )}

        {/* Advice */}
        <h2 className="text-xl font-bold text-pink-400 mb-2 text-center">
          cybersecurity advice 🛡️
        </h2>

        <p className="text-center text-white">
          {adviceText}
        </p>
      </div>
    </div>
  );
}
