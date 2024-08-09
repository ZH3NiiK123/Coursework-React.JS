import React from "react";
import Main from "./components/mainPage";
import MoviePage from "./components/moviePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import Favorites from "./components/favorites.jsx";


export default function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route exact path="" Component={Main} />
                    <Route path="/receiver/:id" Component={MoviePage} />
                    <Route path="/favorites" Component={Favorites} />
                </Routes>
            </Router>
        </Provider>
    );
}