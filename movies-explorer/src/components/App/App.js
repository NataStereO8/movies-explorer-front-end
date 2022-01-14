import React from "react";
import { Route, Switch, withRouter, useHistory } from "react-router-dom";
import Main from "../Main/Main";
import SavedMovies from "../SavedMovies/SavedMovies";
import Movies from "../Movies/Movies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Error from "../Error/Error.js";
import * as auth from "../../utils/auth";
import ProtectedRoute from "../ProtectedRoute";
import InfoToolTip from "../InfoToolTip/InfoToolTip";
import BadIcon from "../../images/bad-tik.svg";
import GoodIcon from "../../images/good-tik.svg";
import { getMovies } from "../../utils/MoviesApi";
import { getPersonalInfo, setPersonalInfo, saveFilm, deleteFilm } from "../../utils/MainApi";
import { getUserInfo } from "../../utils/auth";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./App.css";
import "../../index.css";
import "../../fonts/fonts.css";
import {
    filterMoviesByDuration,
    filterMoviesBySearchString,
} from "../../utils/MoviesFilter";
import {
    errorMessage,
    registerSuccessMessage,
    registerErrorMessage,
    movieSearchErrorMessage,
    updateSuccessMessage,
    loginErrorMessage,
} from '../../utils/const';

function App() {

    const [currentUser, setCurrentUser] = React.useState({});
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [isOpenToolTip, setIsOpenToolTip] = React.useState(false);
    const [movies, setMovies] = React.useState([]);
    const [likedMovies, setLikedMovies] = React.useState([]);
    const [toolTipInfo, setToolTipInfo] = React.useState("");
    const [toolTipIcon, setToolTipIcon] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [pageWidth, setPageWidth] = React.useState(0);
    const [visibleCount, setVisibleCount] = React.useState(0);
    const [searchStringSubmit, setSearchStringSubmit] = React.useState("");
    const [isShort, setIsShort] = React.useState(false);
    const [moviesFiltered, setMoviesFiltered] = React.useState([]);
    const [searchString, setSearchString] = React.useState("");
            // eslint-disable-next-line
    const [isMoreButton, setIsMoreButton] = React.useState(false);
    const history = useHistory();


    //проверки и обновление ползователя, регистрация и авторизация
    // _________________________________________________________________________________________________________________

    // React.useEffect(() => {
    //     checkToken();
    //     getCurrentUser();
    //     // eslint-disable-next-line
    // }, [])

    React.useEffect(() => {
        checkToken();
        getPersonalInfo()
            .then((userData) => {
                setCurrentUser(userData);
            })
            .catch((err) => alert(err));
                    // eslint-disable-next-line
    }, [loggedIn]);

    // function getCurrentUser() {
    //     getPersonalInfo()
    //         .then((res) => {
    //             setCurrentUser(res);
    //         })
    //         .catch((err) => alert(err));
    // }

    function checkToken() {
        const token = localStorage.getItem("token");
        getUserInfo(token)
            .then((res) => {
                if (res.ok) {
                    setCurrentUser(res);
                    setLoggedIn(true);
                    return res.json();
                } else {
                    throw new Error();
                }
            })
            .then((res, event) => {
                history.push("/movies");
            })
            .catch(() => { });
    }

    function handleRegister(name, email, password) {
        auth
            .register(name, email, password)
            .then((res) => {
                if (res.ok) {
                    setCurrentUser(res);
                    successRegister();
                    setToolTipInfo(registerSuccessMessage);
                    setToolTipIcon(GoodIcon);
                } else {
                    setIsOpenToolTip(true);
                    setToolTipInfo(registerErrorMessage);
                    setToolTipIcon(BadIcon);
                }
            })
            .catch((e) => console.log(e));
    }

    function successRegister() {
        history.push("/signin");
    }

    function handleLogin(email, password) {
        auth
            .login(email, password)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error();
                }
            })
            .then((data) => {
                setCurrentUser(data);
                localStorage.setItem("token", data.token);
                setLoggedIn(true);
                history.push("/movies");
            })
            .catch(() => {
                setIsOpenToolTip(true);
                setToolTipInfo(loginErrorMessage);
                setToolTipIcon(BadIcon);
            });
    }

    function handleUpdateUser(email, name) {
        setPersonalInfo(email, name)
            .then((res) => {
                setCurrentUser(res);
                setToolTipInfo(updateSuccessMessage);
                setToolTipIcon(GoodIcon);
            })
            .catch((e) => {
                console.log(e);
                setToolTipInfo(errorMessage);
                setToolTipIcon(BadIcon);
            });
    }

    function handleLogout() {
        localStorage.removeItem("token");
        setLoggedIn(false);
        history.push("/signin");
    }

    function closeTooltip() {
        setIsOpenToolTip(false);
        setToolTipInfo("");
    };


    //работа с фильмами
    // _________________________________________________________________________________________________________________

    React.useEffect(() => {
        getMovies()
            .then((res) => {
                setMovies(res);
                setIsLoading(true);
            })
            .then(() => {
                setIsLoading(false);
            })
            .catch((e) => console.log(e));
    }, []);

    function prepareMovieToSave({
        nameRU,
        nameEN,
        director,
        country,
        year,
        description,
        trailerLink: trailer,
        duration,
        id: movieId,
        image: {
            url: image,
            formats: {
                thumbnail: { url: thumbnail },
            },
        }
    }) {
        thumbnail = `https://api.nomoreparties.co${thumbnail}`;
        image = `https://api.nomoreparties.co${image}`;
        return {
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
            movieId
        };
    }

    function cardLikeButtonClicked(movie) {
        saveFilm(prepareMovieToSave(movie))
            .then((addedMovie) => {
                // console.log(likedMovies);
                setLikedMovies([...likedMovies, addedMovie.data]);
                // console.log(addedMovie.data);
                // console.log(likedMovies);
            })
            .catch((e) => {
                console.log(e);
                setToolTipInfo(movieSearchErrorMessage);
                setToolTipIcon(BadIcon);
            });
    }

    function cardDislikeButtonClicked(movie) {
        // console.log(movie.id);
        const id = likedMovies.find((i) => i.movieId === movie.id)._id;
        // console.log(id);
        // console.log(likedMovies);
        deleteFilm(id)
            .then(() => {
                const filteredLikedMovies = likedMovies.filter((i) => i._id !== id);
                console.log(filteredLikedMovies[0]);
                setLikedMovies(filteredLikedMovies);
            })
            .catch((e) => {
                console.log(e);
                setToolTipInfo(movieSearchErrorMessage);
                setToolTipIcon(BadIcon);
            });
    }

    function cardDeleteButtonClicked(movie) {
        deleteFilm(movie._id)
            .then(() => {
                const filteredLikedMovies = likedMovies.filter((i) => i._id !== movie._id);
                console.log(filteredLikedMovies);
                setLikedMovies(filteredLikedMovies);
            })
            .catch((e) => {
                console.log(e);
                setToolTipInfo(movieSearchErrorMessage);
                setToolTipIcon(BadIcon);
            });
    }

    //правила отрисовки карточек 
    // _________________________________________________________________________________________________________________

    function updateWidth() {
        setPageWidth(document.documentElement.scrollWidth);
    }

    function movieSlicer(arr) {
        return arr.slice(0, visibleCount);
    }

    React.useEffect(() => {
        updateWidth();
        window.addEventListener('resize', () => {
            setTimeout(updateWidth, 1000);
        });
    });

    React.useEffect(() => {
        if (pageWidth <= 480) {
            setVisibleCount(5);
        } else if (pageWidth <= 1024) {
            setVisibleCount(8);
        } else {
            setVisibleCount(12);
        }
    }, [pageWidth, moviesFiltered]);

    function getMoreCount(e) {
        if (pageWidth <= 480) {
            setVisibleCount(visibleCount + 5);
        } else if (pageWidth <= 1024) {
            setVisibleCount(visibleCount + 2);
        } else {
            setVisibleCount(visibleCount + 3);
        }
    }

    React.useEffect(() => {
        const savedMoviesObject = JSON.parse(window.localStorage.getItem(`movies-${currentUser.email}`));
        if (savedMoviesObject) {
            setMovies(savedMoviesObject.movies);
            setSearchString(savedMoviesObject.searchPhrase);
        }
    }, [currentUser]);

    const cardsToShow = movieSlicer(moviesFiltered);

    React.useEffect(() => {
        if (visibleCount < moviesFiltered.length) {
            setIsMoreButton(true);
        } else {
            setIsMoreButton(false);
        }
    }, [cardsToShow, visibleCount, moviesFiltered]);

    //фильтрация
    // _________________________________________________________________________________________________________________

    React.useEffect(() => {
        if (searchStringSubmit && isShort) {
            setVisibleCount(getMoreCount());
            setMoviesFiltered(filterMoviesByDuration(moviesFiltered, isShort));
        } else if (!isShort) {
            setVisibleCount(getMoreCount());
            setMoviesFiltered(filterMoviesBySearchString(movies, searchStringSubmit));
        }
        // eslint-disable-next-line
    }, [isShort]);

    React.useEffect(() => {
        if (searchStringSubmit) {
            setVisibleCount(getMoreCount());
            setMoviesFiltered(filterMoviesBySearchString(movies, searchStringSubmit));
        }
        // eslint-disable-next-line
    }, [searchStringSubmit]);

    function handleSearchSubmit(event) {
        event.preventDefault();
        setSearchStringSubmit(searchString);
    }

    function handleChangeSearchString(event) {
        setSearchString(event.target.value);
    }

    function handleChangeIsShort(event) {
        setIsShort(event.target.checked);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <InfoToolTip
                toolTipInfo={toolTipInfo}
                toolTipIcon={toolTipIcon}
                isOpenToolTip={isOpenToolTip}
                onClose={closeTooltip}
            />
            <Switch>
                <Route path="/signup">
                    <Register handleRegister={handleRegister} />
                </Route>
                <Route path="/signin">
                    <Login
                        loggedIn={loggedIn}
                        handleLogin={handleLogin}
                    />
                </Route>
                <Route exact path="/">
                    <Main loggedIn={loggedIn} />
                </Route>
                <ProtectedRoute path="/saved-movies"
                    loggedIn={loggedIn}
                    component={SavedMovies}
                    setCurrentUser={currentUser}
                    isLoading={isLoading}
                    cardsToShow={cardsToShow} 
                    cardLikeButtonClicked={cardLikeButtonClicked}
                    cardDeleteButtonClicked={cardDeleteButtonClicked}
                    visibleCount={visibleCount}
                    getMoreCount={getMoreCount}
                    likedMovies={likedMovies}
                />
                <ProtectedRoute path="/movies"
                    loggedIn={loggedIn}
                    component={Movies}
                    setCurrentUser={currentUser}
                    isLoading={isLoading}
                    handleChangeSearchString={handleChangeSearchString}
                    handleChangeIsShort={handleChangeIsShort}
                    handleSearchSubmit={handleSearchSubmit}
                    isShort={isShort}
                    searchString={searchString}
                    searchStringSubmit={searchStringSubmit}
                    moviesFiltered={moviesFiltered}
                    cardsToShow={cardsToShow}
                    cardLikeButtonClicked={cardLikeButtonClicked}
                    cardDislikeButtonClicked={cardDislikeButtonClicked}
                    visibleCount={visibleCount}
                    getMoreCount={getMoreCount}
                    likedMovies={likedMovies}
                />
                <ProtectedRoute path="/profile"
                    loggedIn={loggedIn}
                    component={Profile}
                    setCurrentUser={currentUser}
                    handleLogout={handleLogout}
                    handleUpdateUser={handleUpdateUser}
                />
                <Route path="*">
                    <Error />
                </Route>
            </Switch>
        </CurrentUserContext.Provider>
    );
}

export default withRouter(App);