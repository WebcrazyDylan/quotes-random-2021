import axios from "axios";
import requests from "./requests";
import "./App.css";
import { useState, useEffect } from "react";

const posterBaseUrl = "http://image.tmdb.org/t/p/original";

function App() {
  const [movie, setMovie] = useState([]);
  const [quote, setQuote] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const themoviedb = await axios.create({
      baseURL: "https://api.themoviedb.org/3"
    });
    const req1 = await themoviedb.get(requests.fetchTrending);
    setMovie(
      req1.data.results[Math.floor(Math.random() * req1.data.results.length)]
    );
    // console.log(req1.data.results);

    const favqs_quote = await axios.create({
      baseURL: "https://favqs.com/api/qotd"
    });
    const req2 = await favqs_quote.get();
    setQuote(req2.data.quote);
    // console.log(req2.data.quote);

    return;
  };

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <div className="App">
      {movie.id ? (
        <div
          className="banner"
          style={{
            backgroundSize: "cover",
            backgroundImage: `url("${posterBaseUrl}${movie?.backdrop_path}")`,
            backgroundPosition: "center center"
          }}
        >
          <div className="banner__contents">
            <h1 className="banner__title">
              {movie?.title || movie?.name || movie?.original_name}
            </h1>

            <h1 className="banner__description">
              {truncate(movie?.overview, 150)}
            </h1>
          </div>

          <div className="quote__container">
            <div className="banner__buttons">
              <button className="banner__btn" onClick={fetchData}>
                New Quote
              </button>
              {/* <button className="banner__btn">My List</button> */}
            </div>
            <div className="quote__text">{quote?.body}</div>
            <div className="quote__author">{quote?.author}</div>
          </div>

          <div className="banner--fadeBottom" />
        </div>
      ) : (
        <header className="banner"></header>
      )}
    </div>
  );
}

export default App;
