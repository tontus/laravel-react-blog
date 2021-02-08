import {Button, Container, Form, Nav, Navbar, Spinner} from "react-bootstrap";
import React, {useContext, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {login, logout} from "../../services/AuthService";

function Header() {
    const [isLoading,setIsloading]= useState(false)
    const [currentUser,setCurrentUser] = useContext(CurrentUserContext)
    let history = useHistory()
    const logoutHandler = async (e)=>{
        e.preventDefault();
        setIsloading(true)
        const response = await logout();
        if (response){
            setIsloading(false)
            setCurrentUser(null)
            history.push(`/login`);

        }
    }
    return (
        <>
            <Navbar bg="dark" expand="lg" variant={'dark'} sticky={"top"}>
                <Container>
                    {/*<Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>*/}
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/posts">Posts</Nav.Link>
                            <Nav.Link href="/users">Users</Nav.Link>

                            {!currentUser && (
                                <>
                                    <Nav.Link href="/register">Register</Nav.Link>
                                    <Nav.Link href="/login">login</Nav.Link>
                                </>
                            )
                            }

                        </Nav>
                        {currentUser && (
                            <>
                                <span className={'text-white'}>Logged in as: {currentUser.username} &nbsp;&nbsp;</span>
                                { isLoading && (
                                    <Button variant="danger" type="button" disabled>
                                        <Spinner animation="border" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </Spinner>{" "}
                                        Saving...
                                    </Button>
                                )}

                                { !isLoading && (
                                    <Button variant="danger" type="button" onClick={(e)=>logoutHandler(e)}>
                                        Logout
                                    </Button>
                                )}
                            </>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    );
}

export default Header;
