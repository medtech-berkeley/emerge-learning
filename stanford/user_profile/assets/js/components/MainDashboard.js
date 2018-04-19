import React from "react";
// import {CategoriesBox} from "./CategoriesBox"
import PropTypes from "prop-types";
import {NavBar} from "./NavBar";
import {UserInfo} from "./UserInfo";
import {Badges} from "./Badges";
// import {Container} from "reactstrap";
// import {NavBar} from "./NavBar";
// import {Router, Route} from "react-router";
// import history from "../history";

export class MainDashboard extends React.Component {
	render() {
		return (
		    <div>
                <NavBar/>
                <UserInfo/>
                <Badges/>
			</div>
		);
	}
}

MainDashboard.propTypes = {
    api: PropTypes.array
};
