import React from "react";
import {Card, CardBody, CardImg, CardTitle, CardSubtitle, Nav, NavItem, NavLink, Navbar, NavbarBrand, NavbarToggler, Button, Container} from "reactstrap";


function Badge(badge) {
    const element = (
        <div className="Badge">
            <Card>
            <div className="badgeImageContainer">
            <CardImg className="badgeImage" top width="100%" src={badge.image}/>
            </div>
            <CardBody>
                <CardTitle className="text-center">{badge.name}</CardTitle>
                <CardSubtitle>{badge.description}</CardSubtitle>
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
                <Card style={{maxHeight: '50vh', overflow: 'auto', marginBottom: '10vh'}}>
                <CardBody>
                <CardTitle >Badges</CardTitle>
                    {badges.map(badge => Badge(badge))}
                </CardBody>
                </Card>
            </div>);
    }
}
