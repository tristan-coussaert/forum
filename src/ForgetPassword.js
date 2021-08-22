import React, {useState} from 'react'
import { auth } from './config';
import { FaUserAlt, FaCheckCircle } from 'react-icons/fa'

const ForgetPassword = () => {

    const [useremail, setUserEmail] = useState('');
    const[succes, setSucces] = useState(null);
    const[error, setError] = useState(null);

    const handleSubmit = e => {
        console.log(useremail)
        e.preventDefault();
        auth.sendPasswordResetEmail(useremail)
        .then(() =>{
            setError(null);
            setSucces(`Consulter votre email ${useremail} pour changer le mot de passe`)
            setUserEmail("");

        })
        .catch(error => {
            setError(error);
            setUserEmail("");
        })
    }

    return (
        <div className="login">
        <div className="login__container">

            { succes && <span
                style={{
                border: "1px solid green",
                background: "green",
                color: "#ffffff"
            }}
            >
                {succes}
            </span>
            
            }

            {error && <span>{error.message}</span>}


            <h1>Mot de passe oublié ?</h1>
            <form onSubmit={handleSubmit}> 
                <h5><FaUserAlt/> E-mail</h5>
                <input value={useremail} onChange={event => setUserEmail(event.target.value)} type="email" placeholder="Adresse Email" />
                <button type="submit" className="btn login__signInButton"><FaCheckCircle class="floatleft"/> Récupérer</button>
            </form>
        </div>

    </div>


    )

}

export default ForgetPassword;