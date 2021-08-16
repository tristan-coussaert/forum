import React, {useState} from 'react'
import './Login.css';
import { Link, useHistory } from 'react-router-dom'
import {auth} from './config'
import { RiLockPasswordFill } from 'react-icons/ri'
import { FaUserAlt, FaCheckCircle } from 'react-icons/fa'

function Login() {
    const history = useHistory();
    const [useremail, setUserEmail] = useState('');
    const [userpassword, setUserPassword] = useState('');
    const loginuser = event => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(useremail,userpassword)
        .then((auth) => {
            history.push('/')
        })
        .catch(e => alert(e.message))
    }
    return (
        <div className="login">
            <div className="login__container">
                <h1>Se connecter</h1>
                <form>
                    <h5><FaUserAlt/> E-mail</h5>
                    <input value={useremail} onChange={event => setUserEmail(event.target.value)} type="email" placeholder="Adresse Email" />
                    <h5><RiLockPasswordFill/>Password</h5>
                    <input value={userpassword} onChange={event => setUserPassword(event.target.value)} type="password" placeholder = "Mot de passe" />
                    <button onClick={loginuser} type="submit" className="btn login__signInButton"><FaCheckCircle class="floatleft"/> VALIDER</button>
                </form>
                <p>Vous n'avez pas encore de compte sur Forum.com ?</p>
                <Link to="/register">
                <button className="btn login__signUpButton">Créer un compte</button>
                </Link>
            </div>

        </div>
    )
}

export default Login;