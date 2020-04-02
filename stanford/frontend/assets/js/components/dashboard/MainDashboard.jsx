import React from "react";
import {CategoriesBox} from "./CategoriesBox";
import {Leaderboard} from "./Leaderboard";
import {ConsentForm} from "./ConsentForm";
import {DemographicSurvey} from "./DemographicSurvey";
import PropTypes from "prop-types"
import {Container} from "reactstrap";
import {Planet, Cat} from 'react-kawaii';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import CourseSectionApi from "../../containers/CourseSectionApi";



export class MainDashboard extends React.Component {
    componentDidMount() {
        this.props.refreshCourses();
        this.props.refreshStudent();
    }

	render() {
		return (
            <Container>
                {/* {console.log(this.props)} */}
                <div id="dashboard">
                <ConsentForm submitConsentForm={this.props.submitConsentForm}
                                consent_prompt_required={this.props.user.consent_prompt_required}
                />
                <DemographicSurvey submitDemographicSurvey={this.props.submitDemographicSurvey}
                                    demographic_survey_required={this.props.user.consent && !this.props.user.completed_demographic_survey}/>

                    <div className="alert alert-primary" role="alert">
                        <b>UPDATE:</b> Emerge now features new <b>COVID-19</b> related chalenges and practice questions. Please check back in for <b>daily challenges</b>. 
                    </div>
                    <br></br>
                    {this.props.courses.map(course => {
                            return <CourseSectionApi course={course} />;
                    })}
                </div>
            </Container>
		);
	}
}

MainDashboard.propTypes = {
    api: PropTypes.array
};
