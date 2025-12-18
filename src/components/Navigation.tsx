import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link
          to="/"
          className={`nav-button ${location.pathname === "/" ? "active" : ""}`}
        >
          Главная
        </Link>
        <Link
          to="/kinogid"
          className={`nav-button ${
            location.pathname === "/kinogid" ? "active" : ""
          }`}
        >
          Киногид
        </Link>
        <Link
          to="/screen"
          className={`nav-button ${
            location.pathname === "/screen" ? "active" : ""
          }`}
        >
          Скриншоты
        </Link>
        <Link
          to="/test"
          className={`nav-button ${
            location.pathname === "/test" ? "active" : ""
          }`}
        >
          Тест
        </Link>
        {/*<Link
          to="/converter"
          className={`nav-button ${
            location.pathname === "/converter" ? "active" : ""
          }`}
        >
          Конвертер
        </Link>
        <Link
          to="/currency-rates"
          className={`nav-button ${
            location.pathname === "/currency-rates" ? "active" : ""
          }`}
        >
          Курс валют
        </Link>*/}
      </div>
    </nav>
  );
};

export default Navigation;
