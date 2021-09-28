import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "../Main/Main";
import SavedMovies from "../SavedMovies/SavedMovies";
import Movies from "../Movies/Movies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import api from "../../utils/api";
import * as auth from "../../utils/auth";
// import ProtectedRoute from "../ProtectedRoute";
import { currentUser, CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./App.css";
import "../../index.css";
import "../../fonts/fonts.css";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: currentUser,
            loggedIn: false,
            email: "",
            isOpenOkToolTip: false,
            isOpenErrorToolTip: false,
        };
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.setCurrentUser = this.setCurrentUser.bind(this);
        this.successRegister = this.successRegister.bind(this);
    }

    componentDidMount() {
        this.checkToken();
        this.getCurrentUser();
    }

    getCurrentUser() {
        api
            .getPersonalInfo()
            .then((res) => {
                this.setState({ currentUser: res });
            })
            .catch((err) => alert(err));
    }

    checkToken() {
        const token = localStorage.getItem("token");
        auth
            .getUserInfo(token)
            .then((res) => {
                if (res.ok) {
                    this.setState({ loggedIn: true });
                    return res.json();
                } else {
                    throw new Error();
                }
            })
            .then((res) => {
                this.setState({ email: res.data.email });
                this.props.history.push("/");
            })
            .catch(() => { });
    }


    handleRegister(email, password) {
        auth
            .register(email, password)
            .then((res) => {
                if (res.ok) {
                    this.setState({ isOpenOkToolTip: true });
                    console.log(this.state.isOpenOkToolTip);
                    this.successRegister();
                } else {
                    this.setState({ isOpenErrorToolTip: true });
                    console.log(this.state.isOpenErrorToolTip);
                }
            })
            .catch((e) => console.log(e));
    }

    successRegister() {
        this.props.history.push("/sign-in");
    }

    handleLogin(email, password) {
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
                localStorage.setItem("token", data.token);
                this.setState({
                    loggedIn: true,
                });
                this.props.history.push("/");
            })
            .catch(() => {
                this.setState({ isOpenErrorToolTip: true });
            });
    }

    handleLogout() {
        localStorage.removeItem("token");
        this.setState({ loggedIn: false });
        this.props.history.push("/sign-in");
    }

    setCurrentUser(currentUser) {
        this.setState({ currentUser });
    }

    render() {
        return (
            <CurrentUserContext.Provider value={this.state.currentUser}>
                <Routes>
                    <Route path="/sign-up">
                        <Register handleRegister={this.handleRegister} />
                    </Route>
                    <Route path="/sign-in">
                        <Login
                            loggedIn={this.state.loggedIn}
                            handleLogin={this.handleLogin}
                        />
                    </Route>
                    <Route path="/main">
                        <Main
                            loggedIn={this.state.loggedIn}
                            handleLogout={this.handleLogout}
                        />
                    </Route>
                    <Route path="/saved-movies">
                        <SavedMovies
                            loggedIn={this.state.loggedIn}
                            handleLogout={this.handleLogout}
                        />
                    </Route>
                    <Route path="/movies">
                        <Movies
                            loggedIn={this.state.loggedIn}
                            handleLogout={this.handleLogout}
                        />
                    </Route>
                    <Route path="/profile">
                        <Profile
                            loggedIn={this.state.loggedIn}
                            handleLogout={this.handleLogout}
                        />
                    </Route>
                    {/* <ProtectedRoute path="/main" loggedIn={this.state.loggedIn} component={Main} setCurrentUser={this.setCurrentUser} />
                    <ProtectedRoute path="/saved-movies" loggedIn={this.state.loggedIn} component={SavedMovies} setCurrentUser={this.setCurrentUser} />
                    <ProtectedRoute path="/movies" loggedIn={this.state.loggedIn} component={Movies} setCurrentUser={this.setCurrentUser} />
                    <ProtectedRoute path="/profile" loggedIn={this.state.loggedIn} component={Profile} setCurrentUser={this.setCurrentUser} /> */}
                </Routes>
            </CurrentUserContext.Provider>
        );
    }
}

export default App;
