//components imports
import MovieCard from "../components/MovieCard/MovieCard";
import useMovieList from "../hooks/useMovieList";
//css imports
import './Home.css'

function Home() {

    const { movieList } = useMovieList("harry", "hitman", "space");

    return (
        <>
            {/*navbar */}
            {/*Mpvielist */}
            {/*pagination buttons */}
            <div className="movie-card-wrapper">
                { movieList.length >0 && movieList.map(movie => <MovieCard
                    key={movie.imdbID}
                    id={movie.imdbID}
                    {...movie}
                />)}
               
            </div>
        </>
    )
}

export default Home;