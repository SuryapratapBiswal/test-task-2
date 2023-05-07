import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net/js/jquery.dataTables.min';
import DataTables from 'datatables.net-dt';
// import demoData from './demoData';

const DataTable = DataTables(Window, $)

const Table = () => {
    const tableRef = useRef();
    const [users, setUsers] = useState([]);


    useEffect(() => {
        fetch('http://localhost:7001/getuser')
            .then(response => response.json())
            .then(data => {
                setUsers(data);
                new DataTable(tableRef.current, {
                    data: users,
                    perPageOptions: [5, 10, 20, 50, 100],
                    columns: [
                        { data: 'name' },
                        { data: 'age-sex' },
                        { data: 'mobile' },
                        { data: 'address' },
                        { data: 'govt-id' },
                        { data: 'guardian-details' },
                        { data: 'nationality' }
                    ],

                });
            })
            .catch(error => console.error(error));
    }, []);
    console.log(users, "users");

    return (
        <div style={{ padding: "20px 20px" }}>
            <table className="datatable" ref={tableRef} id='myTable'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Mobile</th>
                        <th>Address</th>
                        <th>Govt ID</th>
                        <th>Guardian Details</th>
                        <th>Nationality</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.age}</td>
                            <td>{user.mobile}</td>
                            <td>{user.address}</td>
                            <td>{user.govt_id}</td>
                            <td>{`${user.guardian} - ${user.guardian_name}`}</td>
                            <td>{user.nationality}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default Table