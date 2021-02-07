import {Container, Navbar} from "react-bootstrap";
import React from "react";


function Header() {
    return (
        <>

            <Navbar bg="dark" expand="lg" variant={'dark'} sticky={"bottom"} className={'mt-3 text-white'}>
                <Container> <i>This is a demo blog</i></Container>


            </Navbar>


        </>
    );
}

export default Header;
