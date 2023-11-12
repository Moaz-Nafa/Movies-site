
import { Container } from "react-bootstrap";
import React, { useEffect, useState } from 'react'
import NavBar from "./Component/Navbar";
import MoviesList from "./Component/MoviesList";
import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MovieDetails from "./Component/MoviesDetails";

function App() {
  const [movies, setMovies] = useState([])
  const [pageCount, setpageCount] = useState(0)
  //get all movies by axios 
  const getAllMovies = async () => {
    const res = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=ab6f28a251d896cca8146c54e098beec&language=ar")
    setMovies(res.data.results)
    setpageCount(res.data.total_pages)
  }

  //get current page
  const getPage = async (page) => {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=ab6f28a251d896cca8146c54e098beec&language=ar&page=${page}`)
    setMovies(res.data.results)
    setpageCount(res.data.total_pages)
  }

  useEffect(() => {
    getAllMovies();
  }, [])

  //to search in api
  const search = async (word) => {
    if (word === "") {
      getAllMovies();
    } else {
      const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=ab6f28a251d896cca8146c54e098beec&query=${word}&language=ar`)
      setMovies(res.data.results)
      setpageCount(res.data.total_pages)
    }
  }
  return (
    <div className="font color-body ">
      <NavBar search={search} />
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MoviesList movies={movies} getPage={getPage} pageCount={pageCount} />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
