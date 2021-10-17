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
    const history = useHistory();


    //проверки и обновление ползователя, регистрация и авторизация
    React.useEffect(() => {
        checkToken();
        getCurrentUser();
        // eslint-disable-next-line
    }, [])

    function getCurrentUser() {
        getPersonalInfo()
            .then((res) => {
                setCurrentUser(res);
            })
            .catch((err) => alert(err));
    }

    // React.useEffect(() => {
    //     if (getCurrentUser()) {
    //         checkToken()
    //             .then((res) => {
    //                 setCurrentUser(res);
    //                 setLoggedIn(true);
    //             })
    //             .catch((res) => {
    //                 setLoggedIn(false);
    //                 console.log(`Ошибка при проверке токена ${res}`);
    //             });
    //     } else {
    //         setLoggedIn(false);
    //         console.log('Пользователь не авторизовался');
    //     }
    // }, []);

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
                    console.log(res);
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
    }

    //работа с фильмами
    React.useEffect(() => {
        getMovies()
            .then((res) => {
                setMovies(res);
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
            .then((likedMovie) => {
                setLikedMovies([...likedMovies, likedMovie]);
            })
            .catch((e) => {
                console.log(e);
                setToolTipInfo(movieSearchErrorMessage);
                setToolTipIcon(BadIcon);
            });
    }

    function cardDislikeButtonClicked(movie) {
        const id = likedMovies.find((i) => i.movieId === movie.id)._id;
        deleteFilm(id)
            .then(() => {
                const filteredLikedMovies = likedMovies.filter((i) => i._id !== id);
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
                setLikedMovies(filteredLikedMovies);
            })
            .catch((e) => {
                console.log(e);
                setToolTipInfo(movieSearchErrorMessage);
                setToolTipIcon(BadIcon);
            });
    }

    //правила отрисовки карточек 

    function updateWidth() {
        setPageWidth(document.documentElement.scrollWidth);
    }

    // function movieSlicer(arr) {
    //     return arr.slice(0, visibleCount);
    // }

    React.useEffect(() => {
        updateWidth();
        window.addEventListener('resize', () => {
            setTimeout(updateWidth, 1000);
        });
    });

    React.useEffect(() => {
        if (pageWidth <= 480) {
            setVisibleCount(5);
        } else if (pageWidth <= 768) {
            setVisibleCount(8);
        } else {
            setVisibleCount(12);
        }
    }, [pageWidth]);

    function getMoreCount(e) {
        if (pageWidth <= 768) {
            setVisibleCount(visibleCount + 5);
        } else if (pageWidth <= 1024) {
            setVisibleCount(visibleCount + 2);
        } else {
            setVisibleCount(visibleCount + 3);
        }
    }

    //фильтрация

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

    function handleChangeSearchString(event) {
        setSearchString(event.target.value);
    }

    function handleChangeIsShort(event) {
        setIsShort(event.target.checked);
    }

    function handleSearchSubmit(event) {
        event.preventDefault();
        setSearchStringSubmit(searchString);
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
                <ProtectedRoute
                    path="/saved-movies"
                    loggedIn={loggedIn}
                    component={SavedMovies}
                    setCurrentUser={currentUser}
                    isLoading={isLoading}
                    handleChangeSearchString={handleChangeSearchString}
                    handleChangeIsShort={handleChangeIsShort}
                    handleSearchSubmit={handleSearchSubmit}
                    isShort={isShort}
                    moviesFiltered={moviesFiltered}
                    searchString={searchString}
                    searchStringSubmit={searchStringSubmit}
                    cardDeleteButtonClicked={cardDeleteButtonClicked}
                    visibleCount={visibleCount}
                    getMoreCount={getMoreCount}
                />
                <ProtectedRoute
                    path="/movies"
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
                    cardLikeButtonClicked={cardLikeButtonClicked}
                    cardDislikeButtonClicked={cardDislikeButtonClicked}
                    visibleCount={visibleCount}
                    getMoreCount={getMoreCount}
                    likedMovies={likedMovies}
                />
                <ProtectedRoute
                    path="/profile"
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

// class App extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             currentUser: currentUser,
//             loggedIn: true,
//             isOpenToolTip: false,
//             toolTipInfo: {},
//         };
//         this.handleLogin = this.handleLogin.bind(this);
//         this.handleLogout = this.handleLogout.bind(this);
//         this.handleRegister = this.handleRegister.bind(this);
//         this.setCurrentUser = this.setCurrentUser.bind(this);
//         this.successRegister = this.successRegister.bind(this);
//     }

    // componentDidMount() {
    //     this.checkToken();
    //     this.getCurrentUser();
    // }

//     getCurrentUser() {
//         api
//             .getPersonalInfo()
//             .then((res) => {
//                 this.setState({ currentUser: res });
//             })
//             .catch((err) => alert(err));
//     }

//     checkToken() {
//         const token = localStorage.getItem("token");
//         auth
//             .getUserInfo(token)
//             .then((res) => {
//                 if (res.ok) {
//                     this.setState({ loggedIn: true });
//                     return res.json();
//                 } else {
//                     throw new Error();
//                 }
//             })
//             // .then((res, event) => {
//             //     this.props.history.push("/movies");
//             // })
//             .catch(() => { });
//     }

//     handleRegister(name, email, password) {
//         auth
//             .register(name, email, password)
//             .then((res) => {
//                 if (res.ok) {
//                     this.setState({ isOpenOkToolTip: true });
//                     this.successRegister();
//                 } else {
//                     this.setState({ isOpenErrorToolTip: true });
//                     console.log(this.state.isOpenErrorToolTip);
//                 }
//             })
//             .catch((e) => console.log(e));
//     }

//     successRegister() {
//         this.props.history.push("/signin");
//     }

//     handleLogin(email, password) {
//         auth
//             .login(email, password)
//             .then((res) => {
//                 if (res.ok) {
//                     return res.json();
//                 } else {
//                     throw new Error();
//                 }
//             })
//             .then((data) => {
//                 localStorage.setItem("token", data.token);
//                 this.setState({
//                     loggedIn: true,
//                 });
//                 this.props.history.push("/movies");
//             })
//             .catch(() => {
//                 this.setState({ isOpenErrorToolTip: true });
//                 console.log(this.state.isOpenErrorToolTip);
//             });
//     }

//     handleLogout() {
//         localStorage.removeItem("token");
//         this.setState({ loggedIn: false });
//         this.props.history.push("/signin");
//     }

//     closeTooltip() {
//         this.setState({ isOpenToolTip: false, toolTipInfo: {} });
//     }

//     openToolTip(text, icon, iconName) {
//         this.setState({
//             isOpenToolTip: true,
//             toolTipInfo: { text, icon, iconName },
//         });
//     }

//     setCurrentUser(currentUser) {
//         this.setState({ currentUser });
//     }

    //     return (
    //         <CurrentUserContext.Provider value={this.state.currentUser}>
    //             <Switch>
    //                 <Route path="/signup">
    //                     <Register handleRegister={this.handleRegister} />
    //                 </Route>
    //                 <Route path="/signin">
    //                     <Login
    //                         loggedIn={this.state.loggedIn}
    //                         handleLogin={this.handleLogin}
    //                     />
    //                 </Route>
    //                 <Route exact path="/">
    //                     <Main loggedIn={this.state.loggedIn} />
    //                 </Route>
    //                 <ProtectedRoute
    //                     path="/saved-movies"
    //                     loggedIn={this.state.loggedIn}
    //                     component={SavedMovies}
    //                     setCurrentUser={this.setCurrentUser}
    //                 />
    //                 <ProtectedRoute
    //                     path="/movies"
    //                     loggedIn={this.state.loggedIn}
    //                     component={Movies}
    //                     setCurrentUser={this.setCurrentUser}
    //                 />
    //                 <ProtectedRoute
    //                     path="/profile"
    //                     loggedIn={this.state.loggedIn}
    //                     component={Profile}
    //                     setCurrentUser={this.setCurrentUser}
    //                     handleLogout={this.handleLogout}
    //                 />
    //                 <Route path="*">
    //                     <Error />
    //                 </Route>
    //             </Switch>
    //             <InfoToolTip
    //                 icon={this.state.toolTipInfo.icon}
    //                 iconName={this.state.toolTipInfo.iconName}
    //                 text={this.state.toolTipInfo.text}
    //                 isOpen={this.state.isOpenErrorToolTip}
    //                 onClose={this.closeTooltip}
    //             />
    //         </CurrentUserContext.Provider>
    //     );
    // }

