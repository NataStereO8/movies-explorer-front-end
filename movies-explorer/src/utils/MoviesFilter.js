import {
    shortFilmDuration
} from '../utils/const';

export const filterMoviesBySearchString = (movies, searchString) => {
    if (!searchString)
        return [];
    return movies.filter((movie) => movie.nameRU.toLowerCase().includes(searchString.toLowerCase()));
}

export const filterMoviesByDuration = (movies, isShort) => {
    if (isShort) {
        return movies.filter((movie) => movie.duration < shortFilmDuration);
    }
    return movies;
}