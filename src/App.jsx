//Import React, Hooks, Components
import React, { useState, useEffect } from "react";
import Search from "./components/search";
import Spinner from "./components/Spinner";

// Set base url of API
const API_BASE_URL = "https://api.themoviedb.org/3";
//Set the API Key from the hidden env file
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
// How to recieve the info from our API (Authorization Header)
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  //This passes the input into the search props
  const [searchTerm, setSearchTerm] = useState("");

  //Allows to set the error as a value to then be displayed
  const [errorMessage, setErrorMessage] = useState("");

  //Sets the list of movies gathered from API
  const [movieList, setMovieList] = useState([]);

  //Sets Loading state
  const [isLoading, setIsLoading] = useState(false);

  //Fetch movies from API - async to allow time for API
  const fetchMovies = async () => {
    //Set loading state to show Spinner
    setIsLoading(true);
    setErrorMessage("");

    //API communication
    try {
      //set API url specfics with sorting attributes
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error("Failed to fetch movies.");
      }

      const data = await response.json();
      if (data.response === "False") {
        setErrorMessage(data.error || "Failed to fetch movies");
        setMovieList([]);
        return;
      }
      //Set Movie List Array with the data results
      setMovieList(data.results || []);
    } catch (error) {
      console.log(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  //Run Function at page load
  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassle
          </h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className="all-movies">
          <h2 className="mt-[40px]">All Movies</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <p key={movie.id} className="text-white">
                  {movie.title}
                </p>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
