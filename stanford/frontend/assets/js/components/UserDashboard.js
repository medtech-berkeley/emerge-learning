import React from "react";
// import {CategoriesBox} from "./CategoriesBox"
import PropTypes from "prop-types";
import {NavBar} from "./NavBar";
import {UserInfo} from "./UserInfo";
import {Badges} from "./Badges";
import {Graphs} from "./Graphs";
import {Recent} from "./Recent"

import {Button, Col, Container, Row} from "reactstrap";
// import {NavBar} from "./NavBar";
// import {Router, Route} from "react-router";
// import history from "../history";



export class UserDashboard extends React.Component {

	componentWillMount() {
		this.props.refreshUser();
	}

	render() {
		return (
		    <Container>
				<Row>
					<Col xs="3">
						<Row>
							<UserInfo user={this.props.user}/>
						</Row>
					</Col>
					<Col>
						<Row>
							<Badges/>
						</Row>
						<br/>
						<Row>
							<Graphs data={this.props.data}/>
						</Row>
						<br/>
						<Row>
							<Recent/>
						</Row>
					</Col>
				</Row>
			</Container>
		);
	}
}
//
// UserDashboard.propTypes = {
//     user: PropTypes.array
// };
