import React, { useEffect } from "react";
import { MoviesService } from "../api/MoviesService";
import { Link } from 'react-router-dom';
import { moviesList,insertMovie } from "../actions/MoviesActions";
import { useSelector, useDispatch } from 'react-redux';


export const MovieDetails = (props) => {
   const dispatch = useDispatch();
   const moviesStore = useSelector(s => s.movies);
   const { movies } = moviesStore;
   const id = props?.match?.params?.id;

  useEffect(() => {
    if (!movies[id]) {
      MoviesService.getMovieById(id)
      .then((res) => dispatch(moviesList(id, res?.data)))
      .catch((err) => console.error(err));
      }
  },[]);


  return (
    !movies[id]
      ? <></>
      : <>
    <h3>{!!movies && movies[id].title}</h3>
    <h5>{!!movies && movies[id].original_title}</h5>
    <p>{!!movies && movies[id].overview}</p>
    <button onClick={() => dispatch(insertMovie(movies[id]))}>Add to playlist</button>
    <p></p>
    </>
    
  )
};

