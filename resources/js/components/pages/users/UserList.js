import {Badge, Button, Card, Table} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {fetchAllUsers} from "../../../services/UserService";


function UserList() {
    const [users, setUsers] = useState([])
    const getAllUser = async () => {
        const getResponse = await fetchAllUsers();
        setUsers(getResponse.data)
    }
    useEffect(() => {
        getAllUser()
    }, []);
    return (
        <> <Table striped bordered hover className={'mt-3'}>
            <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Website</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user, index) => (
            <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td><Link to={`/users/${user.id}`}>Website</Link></td>
            </tr>
            ))}
            </tbody>
        </Table>
        </>

    );
}

export default UserList;
