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
                <Container>
                    <div id="dashboard">
                    <Router history={history}>
                        <Route exact={true} path="/">
                            <div>
                                <p>CHALLENGES</p>
                                <hr />
                                <CategoriesBox is_challenge_section={true} categories={this.props.categories}/>
                                <p>PRACTICE</p>
                                <hr />
                                <CategoriesBox is_challenge_section={false} categories={this.props.categories}/>
                            </div>
                        </Route>
                    </Router>
                    </div>
                </Container>
            </div>
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
