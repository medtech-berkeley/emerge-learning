import React from "react";
import {Nav, NavItem, NavLink, Navbar, NavbarBrand, NavbarToggler, Button, Container} from "reactstrap";

export class NavBar extends React.Component {
    render() {
        return (
            <Navbar color="dark" expand="lg" fixed="top">
                <Container>
                    <Nav>
                      <NavItem>
                        <NavLink href="#">Dashboard</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="#">Practice</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="#">Challenge</NavLink>
                      </NavItem>
                    </Nav>
                </Container>
                <Container>
                </Container>
                <Nav navbar>
                    <Button href="/logout" color="primary" className="navbar-btn">
                        Logout
                    </Button>
                </Nav>
            </Navbar>);
    }
}
