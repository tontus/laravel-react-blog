import {Card, Container, Nav, Navbar} from "react-bootstrap";
import React from "react";
import {Link} from "react-router-dom";

function Header() {
    return (
        <>
            <Navbar bg="dark" expand="lg" variant={'dark'} sticky={"top"}>
                <Container>
                    {/*<Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>*/}
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Posts</Nav.Link>
                            <Nav.Link href="/users">Users</Nav.Link>
                            <Nav.Link href="/register">Register</Nav.Link>
                            <Nav.Link href="/login">login</Nav.Link>
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    );
}

export default Header;
