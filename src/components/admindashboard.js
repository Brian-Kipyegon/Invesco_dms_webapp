import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table';
import { signOut } from 'firebase/auth';
import { collection, getDocs, addDoc, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import '../styles/admin.css';
import { auth, db } from '../firebaseconfig';
import { useNavigate } from 'react-router-dom';


function Admindashboard() {

    const [columns, setColumns] = useState([
        { title: 'Employee Name', field: 'name' },
        { title: 'Employee ID', field: 'id', type: 'numeric' },
        { title: 'Department', field: 'department' },
        { title: 'Employee email', field: 'email', },
        { title: 'Status', field: 'status', },
    ]);
    const [data, setData] = useState([
        { name: 'Sam Mureithi', department: 'ICT', id: 12567, email: 'Sammureithi@invesco.co.ke', status: 'Active Duty' },
        { name: 'Simon Mwangi', department: 'Claims', id: 4683, email: 'Simonmwangi@invesco.co.ke', status: 'On Leave' },
    ]);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let usersRef = collection(db, 'users');
        onSnapshot(usersRef, (snapshot) => {
            setUsers([]);
            snapshot.docs.forEach(doc => {
                setUsers(prevState => [...prevState, { ...doc.data() }]);
            });
            console.log(users);
        })
    }, [])

    const logout = () => {
        signOut(auth).then(() => {
            navigate("/");
        })
    }

    return (
        <div className="adminContainer">
            <nav className='navbar'>
                <div className='navLeft'>
                    <h1 style={{ color: '#fff', }}>Admin Panel</h1>
                </div>

                <div className='navRight'>
                    <h1>Email</h1>
                    <button onClick={logout}>Log out</button>
                </div>

            </nav>
            <div className="userTable">
                <MaterialTable
                    title="Invesco Employees"
                    columns={columns}
                    data={users}

                    editable={{
                        onRowAdd: newData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    console.log(newData);
                                    addDoc(collection(db, 'users'), {
                                        ...newData
                                    });
                                    resolve();
                                }, 1000)
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    const dataUpdate = [...data];
                                    const index = oldData.tableData.id;
                                    dataUpdate[index] = newData;
                                    setData([...dataUpdate]);

                                    resolve();
                                }, 1000)
                            }),
                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    const dataDelete = [...data];
                                    const index = oldData.tableData.id;
                                    dataDelete.splice(index, 1);
                                    setData([...dataDelete]);


                                    resolve()
                                }, 1000)
                            }),
                    }}
                />
            </div>
        </div>
    )
}


export default Admindashboard
