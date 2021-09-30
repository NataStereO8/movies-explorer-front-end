import React from 'react';
import "../NavTab/NavTab.css";

function NavTab({props}) {


    return (
            <div className="banner__nav">
                <ul className="menu__banner">
                    <li className="menu-item__banner">
                        <button className="menu-item__text-banner">О проекте</button>
                    </li>
                    <li className="menu-item__banner">
                        <button className="menu-item__text-banner">Технологии</button>
                    </li>
                    <li className="menu-item__banner">
                        <button className="menu-item__text-banner">Студент</button>
                    </li>
                </ul>                    
            </div>
    );
}

    export default NavTab;