import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Kinogid from "./Pages/Kinogid";
import Screen from "./Pages/Screen";
import Test from "./Pages/Test";
import Navigation from "./components/Navigation";
import "./App.css";
import Converter from "./Pages/Converter";
import CurrencyRates from "./Pages/CurrencyRates";

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kinogid" element={<Kinogid />} />
          <Route path="/screen" element={<Screen />} />
          <Route path="/test" element={<Test />} />
          <Route path="/converter" element={<Converter />} />
          <Route path="/currency-rates" element={<CurrencyRates />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
