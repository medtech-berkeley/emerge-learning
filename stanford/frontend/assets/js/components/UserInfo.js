import React from "react";
import PropTypes from "prop-types";
import {Nav, NavItem, NavLink, Navbar, NavbarBrand, NavbarToggler, Button, Container} from "reactstrap";
//
// const user = (props) => {
//     return (
//         <h2>props.name</h2>
//     )
// }

export class UserInfo extends React.Component {
    render() {
        return (
            <div className="UserInfo">
                {console.log(this.props.user.name)}
                <h2>{this.props.user.name}</h2>
                <h3>{this.props.user.username}</h3>
                <p>{this.props.user.location}</p>
                <p>{this.props.user.description}</p>
            </div>);
    }
}
//
// UserInfo.propTypes = {
//     user: PropTypes.array
// };
