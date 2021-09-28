import React from 'react';
import "../NavTab/NavTab.css";

function NavTab({props}) {


    return (
            <div className="banner__nav">
                <ul className="menu menu_banner">
                    <li className="menu-item menu-item_banner">
                        <button className="menu-item__text menu-item__text_footer">О проекте</button>
                    </li>
                    <li className="menu-item menu-item_banner">
                        <button className="menu-item__text menu-item__text_footer">Технологии</button>
                    </li>
                    <li className="menu-item menu-item_banner">
                        <button className="menu-item__text menu-item__text_footer">Студент</button>
                    </li>
                </ul>                    
            </div>
    );
}

    export default NavTab;