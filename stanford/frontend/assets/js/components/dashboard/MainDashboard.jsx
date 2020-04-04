import React from "react";
import {ConsentForm} from "./ConsentForm";
import {DemographicSurvey} from "./DemographicSurvey";
import {Container} from "reactstrap";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import CourseSectionApi from "../../containers/CourseSectionApi";
import {CovidSurvey} from "./CovidSurvey";



export class MainDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.renderCourseTabs = this.renderCourseTabs.bind(this);
        this.covidRequired = this.covidRequired.bind(this);
        this.demographicRequired = this.demographicRequired.bind(this);
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
        }
        return null;
    }

    covidRequired() {
        return this.props.user.completed_demographic_survey &&
               !this.props.user.completed_covid19_survey;
    }

    demographicRequired() {
        return !this.props.user.completed_demographic_survey;
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

                    <div className="alert alert-primary" role="alert">
                        <b>UPDATE:</b> Emerge now features new <b>COVID-19</b> related chalenges and practice questions. Please check back in for <b>daily challenges</b>. 
                    </div>
                    <br></br>
                    { this.renderCourseTabs() }
                </div>
            </Container>
		);
	}
}
