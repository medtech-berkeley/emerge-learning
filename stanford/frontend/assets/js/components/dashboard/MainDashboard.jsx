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
        const textStyle = {
            fontSize: '18px', // You can adjust the size as needed
        };
    
        if (this.props.courses.length > 0) {
            return (
                <div>
                    <Tabs>
                        <TabList>
                            {this.props.courses.map(course => {
                                return <Tab key={course.id}>{course.name}</Tab>
                            })}
                        </TabList>
                        {this.props.courses.map(course => {
                            return (
                                <TabPanel key={course.id}>
                                    <CourseSectionApi course={course} />
                                </TabPanel>
                            )
                        })}
                    </Tabs>
                    <div>
                        <p style={textStyle}>
                            Looking to create a quiz? Click <a href="/dashboard/QuestionCreator">here</a> to get started!
                        </p>
                    </div>
                </div>
            );
        } else {
            return (
                <h6 style={textStyle}>
                    You aren't currently enrolled in a course. Sign up for one <a href="/dashboard/settings">here</a>!
                    <br />
                    <br />
                    Looking to create a quiz? Click <a href="/dashboard/QuestionCreator">here</a> to get started!
                </h6>
            );
        }
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
                    <div className="alert alert-success" role="alert">
                        Complete <b>all daily challenges</b> and the <b>final challenge</b> on <b>September 5th, 2024</b> to receive a <b>certificate</b> and be eligible to win a <b>brand new tablet. </b><a href="#" onClick={this.toggleContestRules}>Terms and Conditions</a>
                    </div>
                    <br></br>
                    { this.renderCourseTabs() }
                </div>
            </Container>
		);
	}
}
