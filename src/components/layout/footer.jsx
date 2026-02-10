export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-6">

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* left text */}
          <p className="text-sm">
            © {new Date().getFullYear()} CICADA GAME 🔐 — Tous droits réservés
          </p>

          {/* Link */}
          <div className="flex gap-6 text-sm">
            <span className="hover:text-green-400 cursor-pointer transition">
              stay safe
            </span>
            <span className="hover:text-green-400 cursor-pointer transition">
              learn
            </span>
            <span className="hover:text-green-400 cursor-pointer transition">
              have fun
            </span>
          </div>
        </div>

        {/* bottom line */}
        <div className="mt-4 text-center text-xs text-gray-500">
          study project **English Game** on cybersecurity 🛡️
        </div>
      </div>
    </footer>
  );
}
