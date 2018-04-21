import React from "react"
import {CategoriesBox} from "./CategoriesBox"
import PropTypes from "prop-types"
import {Container} from "reactstrap";
import {NavBar} from "./NavBar";
import {Router, Route} from "react-router";
import history from "../history";

export class MainDashboard extends React.Component {
	render() {
		return (
		    <div>
                <Container>
                    <div>
                        <p>CHALLENGES</p>
                        <hr />
                        <CategoriesBox categories={this.props.categories}/>
                    </div>
                </Container>
</div>
		);
	}
}

MainDashboard.propTypes = {
    api: PropTypes.array
};