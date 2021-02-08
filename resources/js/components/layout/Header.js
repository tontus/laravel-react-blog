import {Button, Container, Nav, Navbar} from "react-bootstrap";
import React, {useContext} from "react";
import {Link} from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Header() {
    const currentUser = useContext(CurrentUserContext)
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

                            {!currentUser.username && (
                                <>
                                    <Nav.Link href="/register">Register</Nav.Link>
                                    <Nav.Link href="/login">login</Nav.Link>
                                </>
                            )
                            }

                        </Nav>
                        {currentUser.username && (
                            <>
                                <span className={'text-white'}>Logged in as: {currentUser.username} &nbsp;&nbsp;</span>
                                <Button variant="danger">Logout</Button>
                            </>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    );
}

export default Header;
