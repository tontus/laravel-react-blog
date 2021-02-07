import {Badge, Button, Card, Dropdown, DropdownButton, Form, Table} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {fetchAllUsers} from "../../../services/UserService";


function UserList() {
    const [users, setUsers] = useState([])
    const [sortInfo, setSortInfo] = useState(null)
    const [filter, setFilter] = useState('')
    const getAllUser = async () => {
        const getResponse = await fetchAllUsers();
        setUsers(getResponse.data)
    }
    let modifiedUser = [...users]
    if (sortInfo != null) {
        modifiedUser.sort((a, b) => {
            if (a[sortInfo.key] < b[sortInfo.key]) {
                return sortInfo.direction === 'asc' ? -1 : 1;
            }
            if (a[sortInfo.key] > b[sortInfo.key]) {
                return sortInfo.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }
    const includedColumns = ["name", "username",'email'];
     modifiedUser = users.filter(item => {
         return Object.keys(item).some(key =>
             includedColumns.includes(key) && typeof item[key] === "string" && item[key].toLowerCase().includes(filter.toLocaleLowerCase())
         );
     });

    useEffect(() => {
        getAllUser()
    }, []);
    return (
        <>
            <div className={'row mt-3'}>
                <div className={'col-4'}>
                    {
                        sortInfo ? (<>
                                Sorted by: {sortInfo.key} ( {sortInfo.direction} ) </>
                        ) : (<></>)

                    }
                </div>
                <div className={'col-4'}>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Type any thing to search</Form.Label>
                        </Form.Group>
                    </Form>
                </div>
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
                <div className={'col-4'}>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control type="text"
                                          value={filter}
                                          onChange={(e) => {
                                              setFilter(e.target.value)
                                          }}
                            />
                        </Form.Group>
                    </Form>
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
                {modifiedUser.map((user, index) => (
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
