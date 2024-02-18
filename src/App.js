import './App.css';
import { useEffect, useState } from 'react';
import searchIcon from './search.svg';
import MovieCard from './Components/MovieCard';
import Navbar from './Components/Navbar';

const API_URL = ' http://www.omdbapi.com/?i=tt3896198&apikey=7a9f7c7f';
const App = () => {
  const [searchID, setSearchID] = useState('');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies("friends");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
    // console.log(data.Search);
    // console.log("hi");
    // console.log(movies);
  }

  return (
    <div className="app">
      <Navbar/>
      <h1>Winkz</h1>
      <div className='search'>
        <input
          placeholder='Search for movies'
          value={searchID}
          onChange={(e) => {setSearchID(e.target.value)}}
        />
        <img
          src={searchIcon}
          alt="search-icon"
          onClick={() => searchMovies(searchID)}
        />
      </div>

      {
        movies?.length > 0
        ? (
          <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie}/>
          ))}
        </div>
        ) : (
          <div className='empty'>
            <h2>No movies found</h2>
            </div>
        )
      }
    </div>
  );
}

export default App;
