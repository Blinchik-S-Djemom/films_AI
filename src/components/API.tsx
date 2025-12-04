import { useState, useEffect } from "react";

function MovieRandom() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch("https://api.poiskkino.dev/v1.4/movie/random", {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-API-KEY": "KSTMC9H-ZQH4MGG-JM25WZZ-7S64HVB",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setData(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  {
    /*if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else */
  }
  {
    return (
      <div>
        <h1>{data.title}</h1>
        <p>{data.description}</p>
      </div>
    );
  }
}

export default MovieRandom;
