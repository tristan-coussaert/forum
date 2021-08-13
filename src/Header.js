import React from 'react'
import './Header.css';
import { Link } from 'react-router-dom'
import { useStateValue } from './Context';
import { auth } from './config';
import logo from './assets/gamecool.png';

function Header() {
    const [{loggedinuser}, dispatch] = useStateValue();
    const logoutUser = () => {
        if(loggedinuser){
            auth.signOut();
        }
    }
    return (
        <nav className="header">
            <Link to="/">
            <img className="header__logo" src={logo} alt="logo" />
            </Link>
            <div className="header__search">
                <input type="text" className="header__searchInput" placeholder="Rechercher dans Gamecool" />
            </div>
            <div className="header__nav">
                <Link to={!loggedinuser && "/login"} className="header__link">
                    <div onClick={logoutUser} className="header__option">
                        <span className="header__optionLineOne">Bonjour, {loggedinuser?.email}</span>
                        <span className="header__optionLineTwo">{loggedinuser ? 'Se déconnecter' : 'Se connecter'} </span>
                    </div>
                </Link>
                <Link to="/register" className="header__link">
                    <p className="header__signUp">{loggedinuser ? '' : 'S"inscrire'}</p>
                </Link>
            </div>
        </nav>
    )
}

export default Header;