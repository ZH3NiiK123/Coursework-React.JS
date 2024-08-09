import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favorites/favorites.slice";


export const store = configureStore({
    reducer: {
        favorites: favoritesReducer,
    },
});