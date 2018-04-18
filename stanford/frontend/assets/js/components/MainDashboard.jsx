import React from "react"
import {CategoriesBox} from "./CategoriesBox"
import PropTypes from "prop-types"
import {Container} from "reactstrap";
import {NavBar} from "./NavBar";

export class MainDashboard extends React.Component {
	render() {
		return (
		    <div>
                <NavBar/>
                <div className="dashboard">
	                <Container>
	                    <p>CHALLENGES</p>
	                    <hr />
	                    <CategoriesBox categories={this.props.categories}/>
	                </Container>
	            </div>
			</div>
		);
	}
}

MainDashboard.propTypes = {
    api: PropTypes.array
};