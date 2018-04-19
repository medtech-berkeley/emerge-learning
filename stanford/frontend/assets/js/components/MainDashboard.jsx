import React from "react"
import {CategoriesBox} from "./CategoriesBox"
import PropTypes from "prop-types"
import {Container} from "reactstrap";
import {NavBar} from "./NavBar";
import {Router, Route, Switch} from "react-router";
import history from "../history";
import {UserDashboard} from "./UserDashboard";

export class MainDashboard extends React.Component {
	render() {
		return (
		    <div>
                <NavBar/>
                <Container>
                    <Router history={history}>
					<div>
					<Switch>
                        <Route exact={true} path="/">
                            <div>
                                <p>CHALLENGES</p>
                                <hr />
                                <CategoriesBox categories={this.props.categories}/>
                            </div>
                        </Route>
						<Route path="/profile" >
							<UserDashboard user={this.props.user}/>
						</Route>
					</Switch>
					</div>
                    </Router>
                </Container>
			</div>
		);
	}
}

MainDashboard.propTypes = {
    api: PropTypes.array
};
