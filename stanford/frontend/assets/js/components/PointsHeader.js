import React from "react";
import {Card, Nav, NavItem, NavLink, Navbar, NavbarBrand, NavbarToggler, Button, Container} from "reactstrap";

export class PointsHeader extends React.Component {
    render() {
        return (
            <div className="PointsHeader">
                <Card style={{"padding": "20px 20px 10px 20px"}}>
                <h3>You have 275 points!</h3>
                </Card>
            </div>);
    }
}
