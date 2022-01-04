import React from 'react';
import "../Main/Main.css";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Tech from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
// import {CurrentUserContext} from "../../contexts/CurrentUserContext";

function Main({loggedIn, handleLogout}) {

// const currentUser = React.useContext(CurrentUserContext);
// <CurrentUserContext.Provider value={this.state.currentUser}/>

    return (
        <section className="content">
            <Header
                    loggedIn={loggedIn}
                    handleLogout={handleLogout}
                />
            <Promo/>
            <AboutProject/>
            <Tech/>
            <AboutMe/>
            <Footer/> 
        </section>
    );
}

export default Main;