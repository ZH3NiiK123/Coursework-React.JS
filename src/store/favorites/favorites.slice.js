import { createSlice } from "@reduxjs/toolkit";

export const favoritesSlice = createSlice({
    name: "favorites",
    initialState: {
        favorites: JSON.parse(localStorage.getItem("favorites")) || [],
    },
    reducers: {
        addFavorites: (state, action) => {
            const movie = action.payload;
            state.favorites.push(movie);
            localStorage.setItem("favorites", JSON.stringify(state.favorites));
        },
        removeFavorites: (state, action) => {
            const movie = action.payload;
            state.favorites = state.favorites.filter(item => item.id !== movie.id);
            localStorage.setItem("favorites", JSON.stringify(state.favorites));
        }
    }
});

export default favoritesSlice.reducer;
export const { addFavorites, removeFavorites } = favoritesSlice.actions;

