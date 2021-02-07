import {Badge, Button, Card, Dropdown, DropdownButton, Form, Pagination, Table} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {fetchAllUsers} from "../../../services/UserService";


function UserList() {
    const [users, setUsers] = useState([])
    const [sortInfo, setSortInfo] = useState(null)
    const [filter, setFilter] = useState('')
    const [itemPerPage, setItemPerPage] = useState(100)
    const [currentPage, setCurrentPage] = useState(1)
    const getAllUser = async () => {
        const getResponse = await fetchAllUsers();
        setUsers(getResponse.data)
    }
    let modifiedUser
    let lastItem = currentPage * itemPerPage
    let firstItem = lastItem - itemPerPage

    useEffect(() => {

        getAllUser().then(() => {

        })
        if (localStorage.getItem('currentPage')) {
            setCurrentPage(parseInt(localStorage.getItem('currentPage')))
        }
        if (localStorage.getItem('modifiedUser')) {
            modifiedUser = JSON.parse(localStorage.getItem('modifiedUser'))
        }
        if (localStorage.getItem('filter')) {
            setFilter(JSON.parse(localStorage.getItem('filter')))
        }
        if (localStorage.getItem('sortInfo')) {
            setSortInfo(JSON.parse(localStorage.getItem('sortInfo')))
        }
        if (localStorage.getItem('itemPerPage')) {
            setItemPerPage(parseInt(localStorage.getItem('itemPerPage')))
        }

    }, []);

    useEffect(() => {
            localStorage.setItem('currentPage', JSON.stringify(currentPage))
            localStorage.setItem('modifiedUser', JSON.stringify(modifiedUser))
            localStorage.setItem('filter', JSON.stringify(filter))
            localStorage.setItem('sortInfo', JSON.stringify(sortInfo))
            localStorage.setItem('itemPerPage', JSON.stringify(itemPerPage))
        }
    )
    const includedColumns = ["name", "username", 'email'];
    modifiedUser = users.filter(item => {
        return Object.keys(item).some(key =>
            includedColumns.includes(key) && typeof item[key] === "string" && item[key].toLowerCase().includes(filter.toLocaleLowerCase())
        );
    });
    if (sortInfo != null) {

        if (modifiedUser === null) {
            modifiedUser = [...users]
        }
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

    let totalPage
    if (typeof modifiedUser.length === 'number' && typeof itemPerPage === 'number') {
        if (modifiedUser.length % itemPerPage !== 0) {
            totalPage = Math.floor(modifiedUser.length / itemPerPage) + 1
        } else {
            totalPage = Math.floor(modifiedUser.length / itemPerPage)
        }

    }
    let paginationItem = []
    for (let number = 1; number <= totalPage; number++) {
        paginationItem.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={()=> setCurrentPage(number)}>
                {number}
            </Pagination.Item>,
        );
    }

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
                <div className={'col-4'}>
                    <Form>
                        <Form.Group>
                            <Form.Label>Number of item on page </Form.Label>
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
                <div className={'col-4'}>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control type="number"
                                          min="1"
                                          value={itemPerPage}
                                          onChange={(e) => {
                                              {
                                                  setCurrentPage(1)
                                                  setItemPerPage(parseInt(e.target.value))
                                              }
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
                {modifiedUser.slice(firstItem, lastItem).map((user, index) => (
                    <tr key={index}>

                        <td><Link to={`/users/${user.id}`}>{user.name} </Link></td>
                        <td>{user.email}</td>
                        <td>{user.username}</td>

                    </tr>

                ))}
                </tbody>
            </Table>
            <div>
                <Pagination>{paginationItem}</Pagination>
            </div>
        </>

    );
}

export default UserList;
