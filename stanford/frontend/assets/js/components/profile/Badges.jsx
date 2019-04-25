import React from "react";
import {Card, CardBody, CardImg, CardTitle, CardSubtitle, Nav, NavItem, NavLink, Navbar, NavbarBrand, NavbarToggler, Button, Container} from "reactstrap";


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
        //const badges = [1,1,2];
        if (!badges) {
            return (
                <div className="Badges">
                    <p> You can earn badges by completing quizzes. </p>
                </div>
            );
        }
        return (
            <div className="Badges">
                <Card >
                <CardBody>
                <CardTitle >Badges</CardTitle>
                    
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
