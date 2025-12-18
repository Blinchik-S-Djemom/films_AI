import { useEffect, useState } from "react";
import {
  KinopoiskDev,
  type MovieDtoV13,
} from "@openmoviedb/kinopoiskdev_client";
import { Card } from "antd";

interface Message {
  message: string;
}

const apiKey = import.meta.env.VITE_KP_API_KEY;

const kp = new KinopoiskDev(apiKey, "/api");

function MovieRandom() {
  const [data, setData] = useState<MovieDtoV13[] | null>(null);
  const [error, setError] = useState<Message | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchRandomMovies = async () => {
      try {
        const responses = await Promise.all([
          kp.movie.getRandom(),
          kp.movie.getRandom(),
        ]);

        const successfulMovies = responses
          .map(({ data }) => data)
          .filter(Boolean) as MovieDtoV13[];

        if (successfulMovies.length) {
          setData(successfulMovies);
        }

        const firstError = responses.find(({ error }) => error);
        if (firstError?.error) {
          setError({
            message: `${firstError.error}: ${firstError.message}`,
          });
        }
      } catch (err) {
        console.warn(err);
        setError({ message: "Нет подключения(" });
      } finally {
        setIsLoaded(true);
      }
    };

    fetchRandomMovies();
  }, []);

  if (error) {
    return <div style={{ color: "black" }}>Ошибка: {error.message}</div>;
  }

  if (!isLoaded) {
    return <div style={{ color: "black" }}>Загрузка...</div>;
  }

  if (!data?.length) {
    return <div style={{ color: "black" }}>Нет данных о фильмах</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Случайные фильмы</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "24px",
          marginTop: "20px",
        }}
      >
        {data.map((movie, index) => (
          <Card
            key={movie.id ?? movie.externalId?.imdb ?? index}
            style={{
              marginBottom: "10px",
              background: "#aa9bff4e",
            }}
            title={
              movie.name ||
              movie.alternativeName ||
              movie.enName ||
              "Без названия"
            }
          >
            <div style={{ textAlign: "center" }}>
              {movie.year && (
                <p style={{ color: "White" }}>Год: {movie.year}</p>
              )}
              {movie.rating?.kp && (
                <p style={{ color: "White" }}>Рейтинг: {movie.rating.kp}</p>
              )}
              {movie.poster?.url && (
                <img
                  src={movie.poster.url}
                  alt={movie.name || "Постер фильма"}
                  style={{
                    width: "100%",
                    maxWidth: "200px",
                    height: "300px",
                    objectFit: "cover",
                    marginTop: "15px",
                    borderRadius: "8px",
                  }}
                />
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default MovieRandom;
