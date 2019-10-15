import React from "react";
import {CategoriesBox} from "./CategoriesBox";
import {Leaderboard} from "./Leaderboard";
import {ConsentForm} from "./ConsentForm";
import {DemographicSurvey} from "./DemographicSurvey";
import PropTypes from "prop-types"
import {Container} from "reactstrap";
import {Planet, Cat} from 'react-kawaii';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';



export class MainDashboard extends React.Component {
    componentDidMount() {
        this.props.getCategories();
        this.props.getPracticeLeaderboard();
        this.props.getQuizLeaderboard();
        this.props.getWeeklyLeaderboard();
        this.props.getPreviousLeaderboard();
        this.props.refreshStudent();
    }

	render() {
		return (
		    <div>
                <Container>
                    {console.log(this.props)}
                    <div id="dashboard">
                    {<ConsentForm submitConsentForm={this.props.submitConsentForm}
                                  consent_prompt_required={this.props.user.consent_prompt_required}
                    />}
                    <DemographicSurvey submitDemographicSurvey={this.props.submitDemographicSurvey}
                                       demographic_survey_required={this.props.user.consent && !this.props.user.completed_demographic_survey}/>

                        <div class="alert alert-success" role="alert">
                            <b>Welcome Back!:</b> The <b>post-test</b> will be available for <b>1 week</b>, until <b>October 22nd</b>.
                            After this 1 week period you will be emailed a quick <b>follow-up survey</b>. Shortly after you complete this survey you will receive your <b>certificate</b> if eligible. 
                        </div>
                        <br></br>
                        <div>
                            <p className="section-text">CHALLENGES</p>
                            <hr />
                            <CategoriesBox 
                                is_challenge_section={true} 
                                categories={this.props.categories}
                                selectCategory = {this.props.selectCategory}
                                num_required_quizzes = {this.props.user.num_required_quizzes}
                            />
                            <p className="section-text">PRACTICE</p>
                            <hr />
                            <CategoriesBox 
                                is_challenge_section={false}
                                categories={this.props.categories}
                                selectCategory = {this.props.selectCategory}
                                num_required_quizzes = {this.props.user.num_required_quizzes}
                            />
                            <br />
                            <p className="section-text">LEADERBOARDS</p>
                                <Tabs>
                                    <TabList>
                                        <Tab>Current Week</Tab>
                                        <Tab>Previous Week</Tab>
                                        <Tab>All Quizzes</Tab>
                                        <Tab>All Practice</Tab>
                                    </TabList>
                                    <TabPanel>
                                        <Leaderboard leaderboardResult={this.props.weeklyLeaderboardResult} />
                                    </TabPanel>
                                    <TabPanel>
                                        <Leaderboard leaderboardResult={this.props.previousLeaderboardResult} />
                                    </TabPanel>
                                    <TabPanel>
                                        <Leaderboard leaderboardResult={this.props.quizLeaderboardResult} />
                                    </TabPanel>
                                    <TabPanel>
                                        <Leaderboard leaderboardResult={this.props.practiceLeaderboardResult} />
                                    </TabPanel>
                                </Tabs>
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
