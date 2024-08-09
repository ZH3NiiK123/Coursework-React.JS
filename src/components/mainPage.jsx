import React, { useState, useEffect } from "react";
import axios from "axios";
import { HashLink as Link } from "react-router-hash-link";
import "./styles/mainPage.css";
import PropTypes from "prop-types";
import { NavBar, Footer } from "./H&F.jsx";

export default function Main() {




    return (

        <div className='bodyMoviePage'>
            <Header />
            <MovieSearch />

            <h2>Top  english movies  of 21  centure</h2>
            <SelectionOfEnglishFilms />
            <h1>Films by genre</h1>
            <SelectionOfFilmsByGenre />
            <Footer />
        </div>
    );
}

function Header() {
    return (
        <header className='headerMainPage' >
            <NavBar />
            <SliderHeader />
        </header>
    );
}

function SliderHeader() {
    const [ratedWorks, setRatedWorks] = useState([]);

    const ratedWorksId = ["tt0068646", "tt0944947", "tt0245429"];

    useEffect(() => {
        const fetchData = async () => {
            const promises = ratedWorksId.map(id => PullArrayRatedWorksId(id));
            const results = await Promise.all(promises);
            setRatedWorks(results);
        };

        fetchData();
    }, []);
    return (
        <div>
            <figure className={"icon-cards mt-3"}>
                <div className="icon-cards__content">
                    {ratedWorks.map((film) => (
                        <div className="icon-cards__item d-flex align-items-center justify-content-center" key={film._id}>
                            <Link to={{ pathname: `/receiver/${film.id}` }}>
                                <div className="h1">
                                    <div className='titleText'>
                                        <p className='rateType'>The most rated {film.titleType.text}</p>
                                        <p className='name'>{film.originalTitleText.text}</p>
                                        <p className='description'>{film.plot.plotText.plainText}</p>
                                        <p className='rating'>{film.ratingsSummary.aggregateRating}★</p>
                                    </div>
                                    <div className='containerImg'>
                                        <img src={film.primaryImage.url} alt="" />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </figure >
        </div >
    );
}

function PullArrayRatedWorksId(id) {
    const fetchData = async () => {
        const options = {
            method: "GET",
            url: `https://moviesdatabase.p.rapidapi.com/titles/${id}`,
            params: { info: "base_info" },
            headers: {
                "X-RapidAPI-Key": "7ef3718ceamsh8b2578a90b7da8dp1a7b7cjsn4bd84b7a5564",
                "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com"
            }
        };

        try {
            const response = await axios.request(options);
            return response.data.results;
        } catch (error) {
            console.error(error);
        }
    };

    return fetchData();
}


function MovieSearch() {
    const [searchTerm, setSearchTerm] = useState("");
    const [movieData, setMovieData] = useState([]);
    const [error, setError] = useState(null);
    const [key, setKey] = useState(null);

    const handleKeyDown = (event) => {
        setKey(event.key);
        if (key !== "Enter") {
            return;
        }
        handleSearch();
    };

    const handleSearch = async () => {

        const options = {
            method: "GET",
            url: `https://moviesdatabase.p.rapidapi.com/titles/search/title/${encodeURIComponent(searchTerm)}`,
            params: {
                exact: "false",
                titleType: "movie"
            },
            headers: {
                "X-RapidAPI-Key": "7ef3718ceamsh8b2578a90b7da8dp1a7b7cjsn4bd84b7a5564",
                "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com"
            }
        };

        try {
            const response = await axios.request(options);
            setMovieData(response.data.results);
            setError(null);
        } catch (error) {
            setMovieData(null);
            setError(error);
        }
    };
    if (movieData !== null) { checkSelection(movieData); }
    return (
        <div className='sel' id="catalog" >
            <div className="search-container">
                <input type="text" name="search" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={handleKeyDown} className="search-input" />
                <Link href="#" className="search-btn">
                    <i className="fas fa-search" onClick={handleSearch}></i>
                </Link>
            </div>
            {error && <p>Error: {error.message}</p>}

            {movieData && movieData.length > 0 && (
                <OutputSliderItem movieData={movieData} />
            )}
        </div>
    );
}

function SelectionOfEnglishFilms() {
    const [moviData, setMoviData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const options = {
                method: "GET",
                url: "https://moviesdatabase.p.rapidapi.com/titles",
                params: {
                    startYear: "2000",
                    titleType: "movie",
                    list: "top_rated_english_250",
                    endYear: "2023",
                    limit: "20",
                },
                headers: {
                    "X-RapidAPI-Key": "eed0949797msheb9218849d27c0dp1de93fjsn5278445fdfdc",
                    "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com"
                }
            };

            try {
                const response = await axios.request(options);
                setMoviData(response.data.results);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);
    checkSelection(moviData);

    return (
        <OutputSliderItem movieData={moviData} />
    );
}

function SelectionOfFilmsByGenre() {
    const [selectedGenre, setSelectedGenre] = useState("");

    const handleGenreChange = (event) => {
        setSelectedGenre(event.target.value);
    };
    return (
        <div>
            <h2>Choose a genre</h2>
            <p className='container'>Selected genre:<select onChange={handleGenreChange} className=''>
                <option value="">Select a genre</option>
                <option value="Action">Action</option>
                <option value="Comedy">Comedy</option>
                <option value="Drama">Drama</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Crime">Crime</option>
                <option value="Horror">Horror</option>
                <option value="Thriller">Thriller</option>
            </select>
            </p>
            <OutputOfFilmsByGenre selectedGenre={selectedGenre} />
        </div>
    );
}

OutputOfFilmsByGenre.propTypes = {
    selectedGenre: PropTypes.string
};

function OutputOfFilmsByGenre({ selectedGenre }) {
    const [filmByGenreData, setFilmByGenreData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let options = {
                method: "GET",
                url: "https://moviesdatabase.p.rapidapi.com/titles",
                params: {
                    startYear: "1990",
                    endYear: "2023",
                    list: "top_boxoffice_200",
                    genre: selectedGenre || "Action",
                    titleType: "movie",
                    limit: "30"
                },
                headers: {
                    "X-RapidAPI-Key": "eed0949797msheb9218849d27c0dp1de93fjsn5278445fdfdc",
                    "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com"
                }
            };

            try {
                const response = await axios.request(options);
                setFilmByGenreData(response.data.results);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [selectedGenre]);

    checkSelection(filmByGenreData);

    return (
        <div className='slider'>
            <OutputSliderItem movieData={filmByGenreData} />
        </div>
    );
}

function checkSelection(filmData) {
    const filteredData = filmData.filter(film => {
        const { primaryImage, releaseDate } = film;
        return (
            primaryImage?.url !== null &&
            primaryImage !== null &&
            releaseDate?.day !== null &&
            releaseDate?.month !== null &&
            releaseDate?.year !== null &&
            primaryImage?.url !== undefined &&
            releaseDate?.day !== undefined &&
            releaseDate?.month !== undefined &&
            releaseDate?.year !== undefined
        );
    });

    filmData.length = 0;

    filteredData.forEach(film => {
        filmData.push(film);
    });
}



function OutputSliderItem({ movieData }) {

    return (
        <div className='slider'>
            {movieData.map((film) => (
                <div className='sliderElements' key={film.id}>
                    <Link to={{ pathname: `/receiver/${film.id}` }}>
                        <img src={film.primaryImage?.url} width='260' height='85%' alt='' />
                        <h3>{film.originalTitleText.text}</h3>
                        <p>{String(film.releaseDate?.day).padStart(2, "0")}.{String(film.releaseDate?.month).padStart(2, "0")}.{String(film.releaseDate?.year).padStart(4, "X")} </p>
                    </Link>
                </div>
            ))}
        </div>
    );
}

OutputSliderItem.propTypes = {
    movieData: PropTypes.array
};
