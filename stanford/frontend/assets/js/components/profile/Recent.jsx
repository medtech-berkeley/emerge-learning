import React from "react";
import {Card, Nav, NavItem, NavLink, Navbar, NavbarBrand, NavbarToggler, Button, Container} from "reactstrap";

export class Recent extends React.Component {
    render() {
        return (
            <div className="Graphs">
                <p><b>Recent</b></p>
                <hr/>
                <Card>
                    <div className="card-body">
                <p>Recent activity</p>
                </div>
                </Card>
            </div>);
    }
}
