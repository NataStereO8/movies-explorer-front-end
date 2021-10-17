import { getApiResult, getToken } from "./apiUtils";
import { BASE_URL } from "../utils/const";

export const saveFilm = ({
    nameRU,
    nameEN,
    director,
    country,
    year,
    description,
    trailer,
    duration,
    image,
    thumbnail,
    movieId,
}) => {
    return fetch(`${BASE_URL}/movies`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
            nameRU,
            nameEN,
            director,
            country,
            year,
            description,
            trailer,
            duration,
            image,
            thumbnail,
            movieId,
        }),
    }).then(getApiResult);
};

export const deleteFilm = (id) => {
    return fetch(`${BASE_URL}/movies/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
    }).then(getApiResult);
};

export const getPersonalInfo = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
    }).then(getApiResult);
};

export const setPersonalInfo = ({ name, email }) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ name, email }),
    }).then(getApiResult);
};

export const getSavedMovies = () => {
    return fetch(`${BASE_URL}/movies/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
    }).then(getApiResult);
};
