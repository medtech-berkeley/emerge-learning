import React from "react"
import {Card, CardBody, CardHeader, CardFooter, Container} from "reactstrap";
import {CategoriesBox} from "./CategoriesBox"
import PropTypes from "prop-types"

export class MainDashboard extends React.Component {
	render() {
		return (
			<div class="container">
				<p>CHALLENGES</p>
				<hr />
				<CategoriesBox categories={this.props.categories}/>
			</div>
		);
	}
}

MainDashboard.propTypes = {
    api: PropTypes.array
};