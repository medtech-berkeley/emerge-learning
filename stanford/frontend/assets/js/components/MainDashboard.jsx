import React from "react"
import {CategoriesBox} from "./CategoriesBox"
import {Leaderboard} from "./Leaderboard"
import PropTypes from "prop-types"
import {Container} from "reactstrap";


export class MainDashboard extends React.Component {
    componentDidMount() {
        this.props.refreshStudents();
        this.props.getCategories();
        this.props.getLeaderboard();
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
                            <Leaderboard leaderboardResult={this.props.leaderboardResult} />
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