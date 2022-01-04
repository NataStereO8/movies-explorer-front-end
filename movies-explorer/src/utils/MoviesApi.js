import { getApiResult } from "./apiUtils";
import {
    BASE_URL_BEATFILM,
} from '../utils/const';

export const BASE_URL = 'https://api.nomoreparties.co';

export const getMovies = () => {
    return fetch(`${BASE_URL_BEATFILM}/beatfilm-movies`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(getApiResult);
}