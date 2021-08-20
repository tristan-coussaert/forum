import React from 'react'
import './Header.css';
import { Link } from 'react-router-dom'
import { useStateValue } from './Context';
import { auth } from './config';
import logo from './assets/Forum-logo.png';

function Header() {
    const [{loggedinuser}] = useStateValue();
    const logoutUser = () => {
        if(loggedinuser){
            auth.signOut();
        }
    }

    function UserLogOut() {
        return <Link to={"/"}><button className="header__buttonLog">Se Déconnecter</button></Link>;
      }

      function GuestLogIn() {
        return <Link to={"/login"}><button className="header__buttonLog">Se Connecter</button></Link>;
      }

      function LogButton() {
        if (loggedinuser) {
          return <UserLogOut />;
        }
        return <GuestLogIn />;
      }

      function GuestSignIn() {
        return <button className="header__buttonSign">S'inscrire</button>;
      }

      function SignButton(){
          if(!loggedinuser) {
             return <GuestSignIn />
          }
          return null;
      }

    return (
        <nav className="header">
            <Link to="/">
            <img className="header__logo" src={logo} alt="logo" />
            </Link>
            <div className="header__search">
                <input type="text" className="header__searchInput" placeholder="Rechercher dans Forum" />
            </div>
            <div className="header__nav">
                    <div className="header__option">
                        <span className="header__optionLineOne">{loggedinuser?.email}</span>
                        <span className="header__optionLineTwo" onClick={logoutUser}> <LogButton /> </span>
                    </div>
                <Link to="/register" className="header__link">
                    <p className="header__signUp"><SignButton /></p>
                </Link>
            </div>
        </nav>
    )
}

export default Header;