import { useEffect, useState } from "react";
import { searchMovie } from "../apis/omdb";
import axios from "axios";
//components imports
import MovieCard from "../components/MovieCard/MovieCard";
//css imports
import './Home.css'

function Home() {

    const [movieList, setMovieList] = useState([]);
    //now we want to search for multiple movie names so we should be using axios.all 
    async function downloadDefaultMovies(...args) {
        const urls = args.map((name) => searchMovie(name));
        const response = await axios.all(urls.map(url => axios.get(url)));
        const movies = response.map((movieResponse) => movieResponse.data.Search);
        //now we have the no. of arrays of movieList
        //we need to concatinate now
        setMovieList( [].concat(...movies))
    }
    //when we want to load something best to use is useEffect
    useEffect(() => {
        downloadDefaultMovies("harry", "hitman", "space")

    }, [])

    return (
        <>
            {/*navbar */}
            {/*Mpvielist */}
            {/*pagination buttons */}
            <div className="movie-card-wrapper">
                {movieList.map(movie => <MovieCard key={movie.imdbID}
                    {...movie}
                />)}
            </div>
        </>
    )
}

export default Home;