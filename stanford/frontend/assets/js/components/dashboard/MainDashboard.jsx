import React from "react";
import {CategoriesBox} from "./CategoriesBox";
import {Leaderboard} from "./Leaderboard";
import {ConsentForm} from "./ConsentForm";
import {DemographicSurvey} from "./DemographicSurvey";
import PropTypes from "prop-types"
import {Container} from "reactstrap";
import {Planet, Cat} from 'react-kawaii';



export class MainDashboard extends React.Component {
    componentDidMount() {
        this.props.getCategories();
        this.props.getLeaderboard();
        this.props.refreshStudent();
    }

	render() {
		return (
		    <div>
                <Container>
                    <div id="dashboard">
                    {<ConsentForm submitConsentForm={this.props.submitConsentForm}
                                  consent_prompt_required={this.props.user.consent_prompt_required}
                    />}
                    <DemographicSurvey submitDemographicSurvey={this.props.submitDemographicSurvey}
                                       demographic_survey_required={this.props.user.consent && !this.props.user.completed_demographic_survey}/>
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