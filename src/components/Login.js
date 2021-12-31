import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseconfig';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState();
    const [error, setError] = useState();
    const navigate = useNavigate();
    s
    const handleSubmit = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password).then(userCredentials => {
            navigate('/adminpanel');
            setUser(userCredentials.user);
        }).catch((error) => { setError("Failed to log in."); });

        setEmail('');
        setPassword('');
    }

    return (
        <div className="login">
            <h1>Log in</h1>
            {error && <h3 style={{ color: 'red' }}>{error}</h3>}
            <form onSubmit={handleSubmit}>
                <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                <input type="text" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                <input type="submit" />
            </form>
        </div>
    )
}
