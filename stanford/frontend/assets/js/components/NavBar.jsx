import React from "react";
import {Nav, Navbar, NavbarBrand, NavbarToggler, Button, Container} from "reactstrap";

export class NavBar extends React.Component {
    render() {
        return (
            <Navbar color="dark" expand="lg" fixed="top">
                <Container>
                    <NavbarBrand href="#">EMT Learning Platform v0.10</NavbarBrand>
                    <NavbarToggler type="button">
                        <span className="navbar-toggler-icon"/>
                    </NavbarToggler>
                </Container>
                <Nav navbar>
                    <Button href="/logout" color="primary" className="navbar-btn">
                        Logout
                    </Button>
                </Nav>
            </Navbar>);
    }
}