import {Badge, Button, Card, Dropdown, DropdownButton, Table} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {fetchAllUsers} from "../../../services/UserService";


function UserList() {
    const [users, setUsers] = useState([])
    const [sortInfo, setSortInfo] = useState(null)
    const getAllUser = async () => {
        const getResponse = await fetchAllUsers();
        setUsers(getResponse.data)
    }
    let sortedUser = [...users]
    if (sortInfo != null) {
        sortedUser.sort((a, b) => {
            if (a[sortInfo.key] < b[sortInfo.key]) {
                return sortInfo.direction === 'asc' ? -1 : 1;
            }
            if (a[sortInfo.key] > b[sortInfo.key]) {
                return sortInfo.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }

    useEffect(() => {
        getAllUser()
    }, []);
    return (
        <>
            <div className={'row mt-3'}>
                {
                    sortInfo ? (<div className={'col-4'}>
                        Sorted by: {sortInfo.key} ( {sortInfo.direction} )
                    </div>) : (<div></div>)
                }

            </div>
            <div className={'row'}>
                <div className={'col-4'}>
                    <DropdownButton id="dropdown-basic-button" title="Sort by">
                        <Dropdown.Item onClick={() => setSortInfo({key: 'name', direction: 'asc'})}>Name
                            (ASC)</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSortInfo({key: 'name', direction: 'dsc'})}>Name
                            (DSC)</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSortInfo({key: 'email', direction: 'asc'})}>Email
                            (ASC)</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSortInfo({key: 'email', direction: 'dsc'})}>Email
                            (DSC)</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSortInfo({key: 'username', direction: 'asc'})}>Username
                            (ASC)</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSortInfo({key: 'username', direction: 'dsc'})}>Username
                            (DSC)</Dropdown.Item>
                    </DropdownButton>

                </div>
            </div>

            <Table striped bordered hover className={'mt-3'}>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Username</th>
                </tr>
                </thead>
                <tbody>
                {sortedUser.map((user, index) => (
                    <tr key={index}>

                        <td><Link to={`/users/${user.id}`}>{user.name} </Link></td>
                        <td>{user.email}</td>
                        <td>{user.username}</td>

                    </tr>

                ))}
                </tbody>
            </Table>
        </>

    );
}

export default UserList;
