import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseconfig';
import { useAuth } from '../contexts/AuthContext';
import { collection, query, getDocs, where, updateDoc, doc } from 'firebase/firestore';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { currentUser } = useAuth();
    const [error, setError] = useState();
    const [changePassword, setChangePassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [user, setUser] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            navigate("/adminpanel");
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password).then(userCredentials => {
            navigate('/adminpanel');
        }).catch((error) => {
            try {
                let colRef = collection(db, 'users');
                let q = query(colRef, where('email', '==', email));
                getDocs(q).then((querySnapshot) => {
                    querySnapshot.forEach(doc => {
                        const id = doc.id
                        const data = doc.data()
                        setUser({ userid: id, ...data });
                        if (data.email == email && password == 123456) {
                            if (data.firstlogin === true) {
                                setChangePassword(true);
                            }
                        } else if (data.email == email && password == data.password) {
                            navigate('/userpanel');
                        }
                    })
                })
            } catch (err) {
                console.log(err);
                setError("Failed to log in.");
            }

        });

        setEmail('');
        setPassword('');
    }

    const handleChangePassword = (id) => {
        let docRef = doc(db, 'users', id);

        updateDoc(docRef, {
            password: newPassword,
            firstlogin: false,
        })
        navigate("/userpanel")
    }


    return (
        <div className="loginContainer">

            {
                changePassword &&
                <div className="changepassword">
                    <form className="form">
                        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder='Enter your new password' />
                        <input type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} placeholder='Confirm password' />
                        <button onClick={() => handleChangePassword(user.userid)} className="btn">Submit</button>
                    </form>
                </div>
            }

            <div className='loginForm'>
                {error && <div>Error</div>}
                <form className='form' onSubmit={handleSubmit} >
                    <input type="email" placeholder='Enter your email' value={email} onChange={(e) => { setEmail(e.target.value) }} required />
                    <input type="password" placeholder='Enter password' value={password} onChange={(e) => { setPassword(e.target.value) }} required />
                    <button type="submit" className='btn' >Login</button>
                </form>

            </div>
        </div>
    )

}
