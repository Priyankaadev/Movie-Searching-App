import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useDebounce from '../../hooks/useDebounce';
import useMovieList from '../../hooks/useMovieList';
import { Link, useNavigate } from 'react-router-dom';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { useState, useContext } from 'react';
import ThemeContext from '../../context/ThemeContext';

function Navbar() {
    const [isAutoCompleteVisible, setIsAutoCompleteVisible] = useState(false)
    const [searchTerm, setSearchTerm] = useState('');
    const { movieList } = useMovieList(searchTerm)
    const navigator = useNavigate()

    const {theme, setTheme} =useContext(ThemeContext);

    function handleAutoCompleteClick(e, movieImdbId) {
        console.log('onMousedown', e.target);
        // console.log(movieImdbId);
        navigator(`/movie/${movieImdbId}`);
    }
    return (
        <div className=" navbar-wrapper">
            <div className='movie-base-title'><Link to='/'>Movie Base</Link></div>
            <div className=" search-bar">
                <input type="text"
                    id='movie-search-input'
                    onFocus={() => {
                        setIsAutoCompleteVisible(true)
                    }}
                    onBlur={(e) => {

                        setIsAutoCompleteVisible(false)
                    }}
                    onChange={useDebounce((e) => {
                        setSearchTerm(e.target.value)
                    })}
                    placeholder='what movie you are thinking about..'
                />

                <div id='result-list' style={{ display: (isAutoCompleteVisible) ? 'block' : 'none' }}>
                    <div className="autocomplete-result">Auto complete results.....{searchTerm}</div>

                    {movieList.length > 0 &&
                        movieList.map(movie => (

                            <div onMouseDown={(e) => handleAutoCompleteClick(e, movie.imdbID)}
                                key={movie.imdbID}
                                className='autocomplete-result'>
                                {movie.Title}
                            </div>))}
                </div>
            </div>
            <div onClick={() => setTheme((theme =='dark')? "light" : "dark")}>
                <FontAwesomeIcon className='theme-icon' icon={(theme== 'dark')? faSun : faMoon}/>
            </div>
        </div>
    )
}
export default Navbar;