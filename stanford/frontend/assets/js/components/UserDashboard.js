import React from "react";
// import {CategoriesBox} from "./CategoriesBox"
import PropTypes from "prop-types";
import {NavBar} from "./NavBar";
import {UserInfo} from "./UserInfo";
import {Badges} from "./Badges";
import {Graphs} from "./Graphs";
import {Recent} from "./Recent";
import {PointsHeader} from "./PointsHeader";

import {Button, Col, Container, Row} from "reactstrap";
// import {NavBar} from "./NavBar";
// import {Router, Route} from "react-router";
// import history from "../history";

export class UserDashboard extends React.Component {

	componentWillMount() {
		this.props.getQuestionUserData();
		this.props.refreshData();
		this.props.refreshUser();
	}

	render() {
		return (
			<div className="UserDashboard">
		    <Container>
				<Row>
					<Col sm="12" md="3">
						<Row>
							<UserInfo user={this.props.user}/>
						</Row>
						<br/>
						<Row>
							<Badges/>
						</Row>						
					</Col>
					<Col s="12" md="9">
						<Row>
							<PointsHeader/>
						</Row>
						<br/>
						<Row>
							<Graphs data={this.props.data} user={this.props.user} questionUserData={this.props.questionUserData}/>
						</Row>
					</Col>
				</Row>
			</Container>
			</div>
		);
	}
}
//
// UserDashboard.propTypes = {
//     user: PropTypes.array
// };
