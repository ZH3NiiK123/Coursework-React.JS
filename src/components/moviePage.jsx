import React, { useState, useEffect } from "react";
import "./styles/moviePage.css";
import axios from "axios";
import { NavBar, Footer } from "./H&F.jsx";
import { useDispatch, useSelector } from "react-redux";
import { addFavorites, removeFavorites } from "../store/favorites/favorites.slice.js";

export default function MoviePage() {
    const favorites = useSelector(state => state.favorites.favorites);
    const dispatch = useDispatch();

    const [movieData, setMovieData] = useState(null);
    const pathname = window.location.pathname;
    const movieID = String(pathname.split("/").slice(2));

    useEffect(() => {
        const fetchData = async () => {
            const options = {
                method: "GET",
                url: `https://moviesdatabase.p.rapidapi.com/titles/${encodeURIComponent(movieID)}`,
                params: { info: "base_info" },
                headers: {
                    "X-RapidAPI-Key": "7ef3718ceamsh8b2578a90b7da8dp1a7b7cjsn4bd84b7a5564",
                    "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com"
                }
            };

            try {
                const response = await axios.request(options);
                setMovieData(response.data.results);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);
    let isExist = favorites.some(m => m.id === movieData?.id);

    const selectReducer = () => {
        if (!isExist) {
            dispatch(addFavorites(movieData));
        }
        else {
            dispatch(removeFavorites(movieData));
        }
    };

    if (movieData !== null) {
        return (
            <div className="contentFull">
                <NavBar />
                <div className='containerMovie'>
                    <img src={movieData?.primaryImage?.url} alt="" width={"300wh"} height={"auto"} />
                    <video src="./styles/pic/loading.gif" alt="" width={"100px"} height={"100px"} />
                    <div className='moveiInfo'>
                        <h1>{movieData?.originalTitleText.text}</h1>
                        <h2>About movie</h2>
                        <table>
                            <tbody>
                                <tr>
                                    <td width={"100vw"} height={"30vh"}>year of release</td>
                                    <td>{String(movieData?.releaseDate?.day).padStart(2, "0")}.{String(movieData?.releaseDate?.month).padStart(2, "0")}.{String(movieData?.releaseDate?.year).padStart(4, "X")}</td>
                                </tr>
                                <tr>
                                    <td height={"30vh"}>type of title</td>
                                    <td>{movieData?.titleType.text}</td>
                                </tr>
                                <tr>
                                    <td height={"30vh"}>Description</td>
                                    <td>{movieData?.plot?.plotText.plainText}</td>
                                </tr>
                                <tr>
                                    <td height={"30vh"}>rating  number of votes</td>
                                    <td>★{movieData?.ratingsSummary?.aggregateRating}/10</td>
                                </tr>
                                <tr>
                                    <td height={"30vh"}>number of votes</td>
                                    <td>{Math.round(movieData?.ratingsSummary?.voteCount / 1000000)} M</td>
                                </tr>
                                <tr>
                                    <td height={"30vh"}>Runtime</td>
                                    <td>{(movieData?.runtime?.seconds) / 60 + " min"}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2} className="buttonTd">
                                        <button className="addButton" onClick={selectReducer}>
                                            {isExist ? "Delete from" : "Add to"} Favorites
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div >
                <Footer />
            </div>
        );

    }
    else {
        return (
            <div>
                <div className="loading-animation"></div>
            </div>
        );
    }
}