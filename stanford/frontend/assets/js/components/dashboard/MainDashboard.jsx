import React from "react";
import {ConsentForm} from "./ConsentForm";
import {DemographicSurvey} from "./DemographicSurvey";
import {Container} from "reactstrap";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import CourseSectionApi from "../../containers/CourseSectionApi";
import {CovidSurvey} from "./CovidSurvey";
import {ContestRules} from "./ContestRules"



export class MainDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.renderCourseTabs = this.renderCourseTabs.bind(this);
        this.covidRequired = this.covidRequired.bind(this);
        this.demographicRequired = this.demographicRequired.bind(this);
        this.toggleContestRules = this.toggleContestRules.bind(this);

        this.state = {
            contestRulesOpen : false,
        };
    }

    componentDidMount() {
        this.props.refreshCourses();
        this.props.refreshStudent();
    }

    renderCourseTabs() {
        if (this.props.courses.length > 0) {
            return <Tabs>
                    <TabList>
                    {this.props.courses.map(course => {
                        return <Tab>{course.name}</Tab>
                    })}
                    </TabList>
                    {this.props.courses.map(course => {
                    return (
                    <TabPanel>
                        <CourseSectionApi course={course} />
                    </TabPanel>)
                    })}
                </Tabs>;
        } else {
            // TODO: Replace the # below with an internal link to the course selection page
            return <h6>You aren't currently enrolled in a course. Sign up for one <a href="/dashboard/course-selection">here</a>!</h6>
        };
    }

    covidRequired() {
        return this.props.user.completed_demographic_survey &&
               !this.props.user.completed_covid19_survey;
    }

    demographicRequired() {
        return !this.props.user.completed_demographic_survey;
    }

    showWhatsappAlert() {
        return this.props.location.search.includes("whatsapp_alert");
    }

    toggleContestRules(event) {
        event.preventDefault();
        this.setState(prevState => ({
            contestRulesOpen: !prevState.contestRulesOpen
        }));
        console.log(this.state)
    }

	render() {
		return (
            <Container>
                {/* {console.log(this.props)} */}
                <div id="dashboard">
                    {/* <ConsentForm submitConsentForm={this.props.submitConsentForm}
                                    consent_prompt_required={this.props.user.consent_prompt_required}/> */}
                    <DemographicSurvey submitDemographicSurvey={this.props.submitDemographicSurvey}
                                        demographic_survey_required={this.demographicRequired()}/>
                    <CovidSurvey submitCovidSurvey={this.props.submitCovid19Survey}
                                        covid_survey_required={this.covidRequired()}/>
                    <ContestRules isOpen={this.state.contestRulesOpen} toggleContestRules={this.toggleContestRules}/>
                    <div className="alert alert-primary" role="alert">
                        <b>UPDATE:</b> Emerge now features new <b>COVID-19</b> related chalenges and practice questions. Please check back in for <b>daily challenges</b>. 
                    </div>
                    <div className="alert alert-success" role="alert">
                        <b>NEW:</b> Complete <b>all daily challenges</b> and the <b>final challenge</b> on <b>May 5th, 2020</b> to receive a <b>certificate</b> and be eligible to win a <b>brand new tablet. </b><a href="#" onClick={this.toggleContestRules}>Terms and Conditions</a>
                    </div>
                    <br></br>
                    { this.renderCourseTabs() }
                </div>
            </Container>
		);
	}
}
