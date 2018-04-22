import React from "react";
import PropTypes from "prop-types";
import {Card, Nav, NavItem, NavLink, Navbar, NavbarBrand, NavbarToggler, Button, Container} from "reactstrap";
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
                <img src={this.props.user.image}/>
                <br/>
                <br/>
                <Card>
                <div className="card-body">
                    <h3 className="card-title">{this.props.user.name}</h3>
                    <h4>({this.props.user.username})</h4>
                    <p>
                        <i id="mapMarker" className="fa fa-map-marker"></i>
                        {this.props.user.location}
                    </p>
                    <p>
                        <i id="academy" className="fa fa-university" aria-hidden="true"></i>
                        {this.props.user.description}
                    </p>
                </div>
                </Card>
            </div>);
    }
}
//
// UserInfo.propTypes = {
//     user: PropTypes.array
// };
