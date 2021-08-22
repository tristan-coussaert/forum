import React, {useState} from 'react'
import './Register.css';
import { useHistory } from 'react-router-dom'
import {auth} from './config'
import { RiLockPasswordFill } from 'react-icons/ri'
import { FaUserAlt} from 'react-icons/fa'

function Register() {
    const history = useHistory();
    const [useremail, setUserEmail] = useState('');
    const [userpassword, setUserPassword] = useState('');

    const signupuser = event => {
        event.preventDefault();
        auth.createUserWithEmailAndPassword(useremail,userpassword)
        .then((auth) => {
            history.push('/')
            alert("Votre compte a été créé !")
        })
        .catch(e => alert(e.message))
    }
    return (
        <div className="register">
            <div className="register__container">
                <h1 className="register__title">Créer un compte</h1>
                <form>
                    <h5><FaUserAlt/> E-mail</h5>
                    <input value={useremail} onChange={event => setUserEmail(event.target.value)} type="email" placeholder="Votre adresse email" />
                    <h5><RiLockPasswordFill/> Password</h5>
                    <input value={userpassword} onChange={event => setUserPassword(event.target.value)} type="password" placeholder="Votre mot de passe" />
                </form>
                <button onClick={signupuser} className="register__signUpButton">Confirmer</button>
            </div>

        </div>
    )
}

export default Register;