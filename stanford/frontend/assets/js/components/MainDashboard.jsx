import React from "react"
import {CategoriesBox} from "./CategoriesBox"
import {Leaderboard} from "./Leaderboard"
import PropTypes from "prop-types"
import {Container} from "reactstrap";
import {NavBar} from "./NavBar";


export class MainDashboard extends React.Component {
    componentWillMount() {
        this.props.refreshStudents();
        this.props.getCategories();
    }

	render() {
		return (
		    <div>
                <Container>
                    <div id="dashboard">
                        <div>
                            <p className="section-text">CHALLENGES</p>
                            <hr />
                            <CategoriesBox 
                                is_challenge_section={true} 
                                categories={this.props.categories}
                                selectCategory = {this.props.selectCategory}
                            />
                            <p className="section-text">PRACTICE</p>
                            <hr />
                            <CategoriesBox 
                                is_challenge_section={false}
                                categories={this.props.categories}
                                selectCategory = {this.props.selectCategory}
                            />
                            <br />
                            <p className="section-text">LEADERBOARD</p>
                            <Leaderboard students={this.props.students} />
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