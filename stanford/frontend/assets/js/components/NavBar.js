import React from "react";
import {Nav, NavItem, NavLink, Navbar, NavbarBrand, NavbarToggler, Button, Container} from "reactstrap";
import {Link} from "react-router-dom";
// TODO: add Link
export class NavBar extends React.Component {
    render() {
        return (
            <Navbar color="dark" expand="lg">
                <Container>
                    <Nav>
                        <div className="navbar-brand"><Link to="/">MTAB</Link></div>
                      <NavItem>
                          <Link to="/" className="nav-link">Dashboard</Link>
                      </NavItem>
                      <NavItem>
                          <Link to="/profile" className="nav-link">Profile</Link>
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
