import { useEffect, useState } from "react";
import {
  KinopoiskDev,
  type MovieDtoV13,
} from "@openmoviedb/kinopoiskdev_client";

interface Message {
  message: string;
}

const apiKey = import.meta.env.VITE_KP_API_KEY;

const kp = new KinopoiskDev(apiKey, "/api");

function MovieRandom() {
  const [data, setData] = useState<MovieDtoV13 | null>(null);
  const [error, setError] = useState<Message | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchRandomMovie = async () => {
      try {
        const { data, error, message } = await kp.movie.getRandom();

        if (data) {
          setData(data);
        }

        if (error) {
          setError({ message: `${error}: ${message}` });
        }

        setIsLoaded(true);
      } catch (err) {
        console.warn(err);
        setError({ message: "Нет подключения(" });
        setIsLoaded(true);
      }
    };

    fetchRandomMovie();
  }, []);

  if (error) {
    return <div style={{ color: "black" }}>Ошибка: {error.message}</div>;
  }

  if (!isLoaded) {
    return <div style={{ color: "black" }}>Загрузка...</div>;
  }

  if (!data) {
    return <div style={{ color: "black" }}>Нет данных о фильме</div>;
  }

  return (
    <div>
      <h1>
        {data.name || data.alternativeName || data.enName || "Без названия"}
      </h1>
      <p>{data.description || "Описание отсутствует"}</p>
      {data.year && <p>Год: {data.year}</p>}
      {data.rating?.kp && <p>Рейтинг: {data.rating.kp}</p>}
      {data.poster?.url && (
        <img
          src={data.poster.url}
          alt={data.name}
          style={{ maxWidth: "300px", marginTop: "20px" }}
        />
      )}
    </div>
  );
}

export default MovieRandom;
