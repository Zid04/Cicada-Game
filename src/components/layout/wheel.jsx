import { useRef, useState, useEffect } from "react";
import { Themes } from "../../data/themeOfWheel";

export default function WHEEL({ onThemeSelected }) {
  const canvasRef = useRef();
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const size = 400;
  const radius = size / 2;

  const drawWheel = (rotationRadians = 0) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, size, size);

    const anglePerTheme = (2 * Math.PI) / Themes.length;

    Themes.forEach((theme, i) => {
      const startAngle = i * anglePerTheme + rotationRadians;
      const endAngle = startAngle + anglePerTheme;

      // slice color
      ctx.beginPath();
      ctx.moveTo(radius, radius);
      ctx.arc(radius, radius, radius, startAngle, endAngle);
      ctx.fillStyle = theme.color;
      ctx.fill();
      ctx.strokeStyle = "#000";
      ctx.stroke();

     // Text
  ctx.save();
  ctx.translate(radius, radius);
  ctx.rotate(startAngle + anglePerTheme / 2);
  ctx.fillStyle = "#fff";

  // size of text based on length
  let fontSize = 14;
  if (theme.label.length > 15) fontSize = 10;
  else if (theme.label.length > 12) fontSize = 12;
  ctx.font = `bold ${fontSize}px sans-serif`;

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  //rayon of text place
  const textRadius = radius * 0.65;

  ctx.fillText(theme.label, textRadius, 0);
  ctx.restore();
});
  };

  useEffect(() => {
    drawWheel(rotation);
  }, [rotation]);

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    const randomIndex = Math.floor(Math.random() * Themes.length);
    const anglePerTheme = 2 * Math.PI / Themes.length; // in radians

    const spins = 5; //  complet spin 
    const finalRotation = rotation + spins * 2 * Math.PI + randomIndex * anglePerTheme;

    // simple Animation
    const duration = 3000;
    const start = performance.now();
    const animate = (time) => {
      const elapsed = time - start;
      const t = Math.min(elapsed / duration, 1);
      // easing for smooth deceleration
      const eased = 1 - Math.pow(1 - t, 3);
      setRotation(rotation + (finalRotation - rotation) * eased);
      if (t < 1) requestAnimationFrame(animate);
      else {
        setIsSpinning(false);
        onThemeSelected(Themes[randomIndex]); // send selected theme to parent
      }
    };
    requestAnimationFrame(animate);
  };

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} width={size} height={size} className="rounded-full shadow-lg" />
      <div className="mt-2 text-white font-bold">▲</div>
      <button
        onClick={spinWheel}
        disabled={isSpinning}
        className="mt-4 px-6 py-3 bg-pink-500 text-black font-bold rounded-xl hover:bg-pink-400 disabled:opacity-50"
      >
      spin the wheel
      </button>
    </div>
  );
}
