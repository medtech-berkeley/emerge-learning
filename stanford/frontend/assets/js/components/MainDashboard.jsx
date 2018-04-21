import React from "react"
import {CategoriesBox} from "./CategoriesBox"
import PropTypes from "prop-types"
import {Container} from "reactstrap";
import {NavBar} from "./NavBar";

export class MainDashboard extends React.Component {
	render() {
		return (
		    <div>
                <Container>
                    <div id="dashboard">
                        <div>
                            <p>CHALLENGES</p>
                            <hr />
                            <CategoriesBox is_challenge_section={true} categories={this.props.categories}/>
                            <p>PRACTICE</p>
                            <hr />
                            <CategoriesBox is_challenge_section={false} categories={this.props.categories}/>
                        </div>
                    </div>
                </Container>
            </div>
		);
	}
}

MainDashboard.propTypes = {
    api: PropTypes.array
};
