import { Component } from "react";

class MovieRandom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      movie: null,
    };
  }

  componentDidMount() {
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
          this.setState({
            isLoaded: true,
            movie: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const { error, isLoaded, movie } = this.state;

    if (error) {
      return (
        <div className="page">
          <p>Error: {error.message}</p>
        </div>
      );
    } else if (!isLoaded) {
      return (
        <div className="page">
          <p>Loading…</p>
        </div>
      );
    } else if (movie && movie.docs && movie.docs.length > 0) {
      const movieData = movie.docs[0];
      return (
        <div className="page">
          <h1>Случайный фильм</h1>
          <div
            style={{
              color: "white",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "20px",
                marginBottom: "20px",
              }}
            >
              {movieData.poster && movieData.poster.previewUrl && (
                <img
                  src={movieData.poster.previewUrl}
                  alt={movieData.name}
                  style={{
                    width: "200px",
                    borderRadius: "10px",
                  }}
                />
              )}
              <div>
                <h2>{movieData.name}</h2>
                {movieData.alternativeName && (
                  <p>
                    <strong>Альтернативное название:</strong>{" "}
                    {movieData.alternativeName}
                  </p>
                )}
                {movieData.rating && movieData.rating.kp && (
                  <p>
                    <strong>Рейтинг КиноПоиск:</strong>{" "}
                    {movieData.rating.kp.toFixed(1)}
                  </p>
                )}
              </div>
            </div>

            {movieData.description && (
              <div style={{ marginBottom: "20px" }}>
                <h3>Описание</h3>
                <p>{movieData.description}</p>
              </div>
            )}

            {movieData.genres && movieData.genres.length > 0 && (
              <div style={{ marginBottom: "20px" }}>
                <h3>Жанры</h3>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                  }}
                >
                  {movieData.genres.map((genre, id) => (
                    <span
                      key={id}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#333",
                        borderRadius: "5px",
                      }}
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div className="page">
          <p>Фильм не найден</p>
        </div>
      );
    }
  }
}

export default MovieRandom;
