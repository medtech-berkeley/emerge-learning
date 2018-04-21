import React from "react"
import {CategoriesBox} from "./CategoriesBox"
import PropTypes from "prop-types"
import {Container} from "reactstrap";
import {NavBar} from "./NavBar";

export class MainDashboard extends React.Component {
	render() {
		return (
			<Container>
				<div>
					<p>CHALLENGES</p>
					<hr />
					<CategoriesBox categories={this.props.categories}/>
				</div>
			</Container>
		);
	}
}

MainDashboard.propTypes = {
    api: PropTypes.array
};
