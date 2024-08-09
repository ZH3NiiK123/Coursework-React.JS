import React from "react";
import "./styles/moviePage.css";
import "./styles/favorites.css";
import "./H&F.jsx";
import { Footer, NavBar } from "./H&F.jsx";
import { useDispatch, useSelector } from "react-redux";

import { removeFavorites } from "../store/favorites/favorites.slice.js";

export default function Favorites() {

    const favorites = useSelector(state => state.favorites.favorites);
    const dispatch = useDispatch();



    if (favorites.length === 0) {
        return (
            <div>
                <NavBar />
                <span className="span">
                    Sorry, but you haven{"'"}t added anything to your favorites, go to the catalog and select the piece you like.
                </span>
            </div>
        );
    } else {
        return (
            <div className="contentFull">
                <NavBar />
                {favorites.map((movieData) =>
                    <div className='containerMovie' id={"xss"} key={movieData.id}>
                        <img src={movieData?.primaryImage?.url} alt="" width={"300wh"} height={"auto"} />
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
                                            <button className="filmWasDeleted" onClick={() => dispatch(removeFavorites(movieData))}>
                                                Delete from Favorites
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div >
                )
                }
                <Footer />
            </div >
        );
    }
}