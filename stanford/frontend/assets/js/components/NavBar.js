import React from "react";
import {Nav, NavItem, NavLink, Navbar, NavbarBrand, NavbarToggler, Button, Container} from "reactstrap";

export class NavBar extends React.Component {
    render() {
        return (
            <Navbar color="dark" expand="lg" fixed="top">
                <Container>
                    <Nav>
                    <NavbarBrand href="/">EMT Learning Platform v0.10</NavbarBrand>
                      <NavItem>
                        <NavLink href="/">Dashboard</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="/profile">Profile</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="#">Challenge</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="#">Settings</NavLink>
                      </NavItem>
                    </Nav>
                </Container>
                <Nav navbar>
                    <Button href="/logout" color="primary" className="navbar-btn">
                        Logout
                    </Button>
                </Nav>
            </Navbar>);
    }
}
