import React from "react";
import {Nav, NavItem, NavLink, Navbar, NavbarBrand, NavbarToggler, Button, Container} from "reactstrap";

export class UserInfo extends React.Component {
    render() {
        return (
            <div className="UserInfo">
                <h2>Full Name</h2>
                <h3>Username</h3>
                <p>More details.</p>
            </div>);
    }
}
