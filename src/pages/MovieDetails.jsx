import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { searchMovieById } from "../apis/omdb";
import MovieCard from "../components/MovieCard/MovieCard"
import './MovieDetails.css';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

function MovieDetails() {
    const [movie, setMovie] = useState(null);
    const { id } = useParams();
    const [query] = useSearchParams();
    console.log(query.get('abc'));

    async function downloadMovie() {
        const response = await axios.get(searchMovieById(id));
        console.log(response.data);
        setMovie(response.data)
    }
    useEffect(() => {
        downloadMovie()
    }, [id])

    return (
        <div className="movie-details-wrapper">
   
                {movie && <MovieCard
                    Title={movie.Title}
                    Year={movie.Year}
                    Type={movie.Type}
                    Poster={movie.Poster}
                    id={movie.imdbID}
                    />
                }
          
         { movie &&  <div className="movie-details">
            <div className="details-list">
              <div>  Genre: {movie.Genre.split(",").map((genre)=>{return <span key={genre} className="genre">{genre}</span>})}</div>
              <div>  Plot: {movie.Plot}</div>
              <div>  Runtime: {movie.Runtime}</div>
              <div>  Actors: {movie.Actors}</div>
              <div>  Director: {movie.Director}</div>
              <Rating items= {10} value={Math.floor(movie.imdbRating)} style={{maxWidth: 300}} />

            </div>
            </div>}
        </div>
    )
}

export default MovieDetails;