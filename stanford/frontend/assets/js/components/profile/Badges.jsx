import React from "react";
import {Card, CardBody, CardImg, CardTitle, CardSubtitle, Nav, NavItem, NavLink, Navbar, NavbarBrand, NavbarToggler, Button, Container} from "reactstrap";
import {Planet, Cat} from 'react-kawaii';

function Badge(badge) {
    const element = (
        <div className="Badge">
            <Card>
            <div className="badgeImageContainer">
            <CardImg className="badgeImage" top width="50px" src={badge.image}/>
            </div>
            <CardBody>
                <CardTitle className="text-center">{badge.description}</CardTitle>
            </CardBody>
            </Card>
        </div>
        );
    return element;
}

export class Badges extends React.Component {
    render() {
        const badges = this.props.user.badges; 

        if (badges === undefined || badges.length == 0) {
            return (
                <div className="Badges text-center">
                <Card >
                <CardBody>
                <div className="text-center">
                <CardTitle >Badges</CardTitle>
                </div>

                <div className="floating" 
                     style=
                     {
                        {"display": "inline-block", "marginRight": "10px", "position": "absolute", "top": "1.2rem", "right": "1rem"}
                     }>
                    <Planet size={30} mood="happy" color="#70D7A3"/>
                </div>
                    <p> You can earn badges by completing quizzes! </p>

                </CardBody>
                </Card>
                </div>
            );
        }
        return (
            <div className="Badges">
                <Card >
                <CardBody>
                <div className="text-center">
                <CardTitle>Badges</CardTitle>
                </div>                    
                    {badges.map(
                       function(badge){
                        return (
                        <tr style={{height: "50px"}}>
                          <td>
                            <img src={badge.image} className="icon-img img-circle" width="40" height="40"/>
                          </td>
                          <td>
                            {badge.description}
                          </td>
                       </tr>
                       )
                     }
                    )} 
                </CardBody>
                </Card>
            </div>);
    }
}
