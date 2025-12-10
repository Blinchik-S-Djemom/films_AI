import React from "react";
import MovieRandom from "../components/API";
const Home: React.FC = () => {
  return (
    <div className="page-container">
      <h1 style={{ color: "White" }}>Добро пожаловать на главную страницу!</h1>
      <p>🍿📽️˙Несколько фильмов, которые могут вас заинтересовать📽️🍿</p>
      <MovieRandom />
    </div>
  );
};

export default Home;
