import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { auth, db } from '../firebaseconfig';
import { signOut } from 'firebase/auth';
import { collection, getDocs, addDoc, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import '../styles/admin.css';

const axios = require('axios');

export default function Adminpanel() {
    const { currentUser } = useAuth();
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [role, setRole] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [empId, setEmpId] = useState('');


    useEffect(() => {
        let usersRef = collection(db, 'users');
        const unsubscribe = onSnapshot(usersRef, (snapshot) => {
            setUsers([]);
            snapshot.docs.forEach(doc => {
                setUsers(prevState => [...prevState, { id: doc.id, ...doc.data() }]);
            })
        })

        return () => unsubscribe()
    }, []);

    const logout = () => {
        signOut(auth).then(() => {
            navigate("/");
        })
    }

    const saveUser = (e) => {
        e.preventDefault();
        addDoc(collection(db, 'users'), {
            name: name,
            email: email,
            id: empId,
            department: department,
            status: "Active",
            firstlogin: true,
        })
        setName('');
        setEmail('');
        setDepartment('');
        setEmpId('');
        setShowModal(false);
    }

    const setUserRole = (id) => {
        let docRef = doc(db, 'Users', id)
        updateDoc(docRef, { role: role })
        setRole("");
    }

    const handleModal = () => {
        setShowModal(!showModal);
    }

    return (
        <div className="adminContainer">
            <nav className='navbar'>
                <div className='navLeft'>
                    <h1 style={{ color: '#fff', }}>Admin Panel</h1>
                </div>

                <div className='navRight'>
                    {currentUser && <p className='email'> User: {currentUser.email}</p>}
                    {currentUser && <button className='logoutBtn' onClick={logout}>signout</button>}
                </div>

            </nav>

            <div className='addBtn'>
                <button className='registerBtn' onClick={handleModal}>Register Employee</button>
            </div>

            {
                showModal &&
                <div className='modal'>
                    <button className='btn' onClick={handleModal}>Close</button>
                    <div className="loginContainer">
                        <div className='loginForm'>

                            <form className='form' onSubmit={saveUser}>
                                <input type="text" placeholder='Enter employee name' value={name} onChange={(e) => { setName(e.target.value) }} required />
                                <input type="email" placeholder='Enter your employee email address' value={email} onChange={(e) => { setEmail(e.target.value) }} required />
                                <input type="text" placeholder='Enter employee department' value={department} onChange={(e) => { setDepartment(e.target.value) }} required />
                                <input type="text" placeholder='Enter employee id' value={empId} onChange={(e) => { setEmpId(e.target.value) }} required />
                                <button type="submit" className='btn' >submit</button>
                            </form>

                        </div>
                    </div>
                </div>
            }

            {/**the table to display users */}
            <div className="userTable">
                <table className="table">
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>email</td>
                            <td>Department</td>
                            <td>Employee id</td>
                            <td>Status</td>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => {
                            return (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.department}</td>
                                    <td>{user.id}</td>
                                    <td>{user.status}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            </div>


            {/**this form is diplayed none for now */}
            <div style={{ display: 'none', }}>
                <h1>Create new user</h1>
                <form onSubmit={saveUser}>
                    <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
                    <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    <input type="submit" value="submit" />
                </form>
            </div>

            {/**display none */}
            <div style={{ display: 'none', }}>
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




        </div>
    )
}
