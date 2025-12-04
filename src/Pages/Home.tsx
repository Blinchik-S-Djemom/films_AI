import React from "react";
import MovieRandom from "../components/API.jsx";

const Home: React.FC = () => {
  return (
    <div className="page-container">
      <h1>Добро пожаловать на главную страницу!</h1>
      <p>🍿📽️˙Несколько фильмов, которые могут вас заинтересовать📽️🍿</p>
      <MovieRandom />
    </div>
  );
};

export default Home;
