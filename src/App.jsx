import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'

// Pages
import HomePage from "./pages/home";
import GLOSSARY from "./pages/glossary";
import RULES from "./pages/rules";
import Navbar from "./components/layout/navbar";
import Scanner from "./pages/scanner";



function App() {
  return (
    <Router>
      
       <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/glossary" element={<GLOSSARY />} />
        <Route path="/rules" element={<RULES />} />
        <Route path="/scanner" element={<Scanner />} />
      </Routes>
    </Router>
  );
}

export default App;
