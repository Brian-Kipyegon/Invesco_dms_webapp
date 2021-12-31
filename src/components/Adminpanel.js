import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { auth, db } from '../firebaseconfig';
import { signOut } from 'firebase/auth';
import { collection, getDocs, addDoc, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function Adminpanel() {
    const { currentUser } = useAuth();
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        let usersRef = collection(db, 'Users');
        // setUsers([]);
        // getDocs(usersRef).then(snapshot => {
        //     snapshot.docs.forEach(doc => {
        //         setUsers(prevState => [...prevState, { id: doc.id, ...doc.data() }]);
        //     })
        // })
        onSnapshot(usersRef, (snapshot) => {
            setUsers([]);
            snapshot.docs.forEach(doc => {
                setUsers(prevState => [...prevState, { id: doc.id, ...doc.data() }]);
            })
        })
    }, []);

    const logout = () => {
        signOut(auth).then(() => {
            navigate("/");
        })
    }

    const saveUser = (e) => {
        e.preventDefault();
        let usersRef = collection(db, 'Users');
        addDoc(usersRef, {
            name: name,
            email: email,
            role: role
        }).then(() => {
            setName('');
            setEmail('');
            setRole('');
        })
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Admin Panel</h1>
            {currentUser && <p>Logged in as {currentUser.email}</p>}
            {currentUser && <button onClick={logout}>Log out</button>}
            <h1>Create new user</h1>
            <form onSubmit={saveUser}>
                <label>Name</label>
                <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} /><br />
                <label>Email</label>
                <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} /><br />
                <input type="submit" value="submit" />
            </form>
            <h1>Users</h1>
            {
                users.map(user => {
                    return (
                        <div key={user.id} style={{ textAlign: 'left', marginLeft: '100px' }}>
                            <p>{user.name}</p>
                            <p>{user.email}</p>
                            <p>{user.role}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}
