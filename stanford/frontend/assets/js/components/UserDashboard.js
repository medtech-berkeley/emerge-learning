import React from "react";
// import {CategoriesBox} from "./CategoriesBox"
import PropTypes from "prop-types";
import {NavBar} from "./NavBar";
import {UserInfo} from "./UserInfo";
import {Badges} from "./Badges";
import {Graphs} from "./Graphs";
import {Recent} from "./Recent"

import {Col, Row} from "reactstrap";
// import {NavBar} from "./NavBar";
// import {Router, Route} from "react-router";
// import history from "../history";



export class UserDashboard extends React.Component {
	render() {
		return (
		    <div>
				<Row>
				<Col xs="3">
                	<UserInfo user={this.props.user}/>
				</Col>
				<Col>
					<Row><Badges/></Row>
					<Row><Graphs data={this.props.data}/></Row>
					<Row><Recent/></Row>
				</Col>
				</Row>
			</div>
		);
	}
}
//
// UserDashboard.propTypes = {
//     user: PropTypes.array
// };
