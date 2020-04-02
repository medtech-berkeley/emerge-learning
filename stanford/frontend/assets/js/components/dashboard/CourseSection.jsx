import React from "react";
import {CategoriesBox} from "./CategoriesBox";
import {Leaderboard} from "./Leaderboard";
import {ConsentForm} from "./ConsentForm";
import {DemographicSurvey} from "./DemographicSurvey";
import PropTypes from "prop-types"
import {Container} from "reactstrap";
import {Planet, Cat} from 'react-kawaii';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';



export class CourseSection extends React.Component {
    componentDidMount() {
        let course = this.props.course;
        this.props.refreshCourses();
        this.props.getCategories(course.id);
        this.props.getPracticeLeaderboard(course.id);
        this.props.getQuizLeaderboard(course.id);
        this.props.getWeeklyLeaderboard(course.id);
        this.props.getPreviousLeaderboard(course.id);
    }

	render() {
        let course = this.props.course;
		return (
                <div>
                    <br />
                    <p className="section-text">{course.name.toUpperCase()} CHALLENGES</p>
                    <hr />
                    <CategoriesBox
                        is_challenge_section={true}
                        categories={this.props.categories[course.id]}
                        selectCategory={this.props.selectCategory}
                        num_required_quizzes={this.props.course.num_required_quizzes}
                    />
                    <p className="section-text">{course.name.toUpperCase()} PRACTICE</p>
                    <hr />
                    <CategoriesBox
                        is_challenge_section={false}
                        categories={this.props.categories[course.id]}
                        selectCategory={this.props.selectCategory}
                        num_required_quizzes={this.props.course.num_required_quizzes}
                    />
                    <br />
                    <p className="section-text">{this.props.course.name.toUpperCase()} LEADERBOARDS</p>
                    <hr />
                        <Tabs>
                            <TabList>
                                <Tab>Current Challenge</Tab>
                                <Tab>Previous Challenge</Tab>
                                <Tab>All Quizzes</Tab>
                                <Tab>All Practice</Tab>
                            </TabList>
                            <TabPanel>
                                <Leaderboard leaderboardResult={this.props.weeklyLeaderboardResult[course.id]} />
                            </TabPanel>
                            <TabPanel>
                                <Leaderboard leaderboardResult={this.props.previousLeaderboardResult[course.id]} />
                            </TabPanel>
                            <TabPanel>
                                <Leaderboard leaderboardResult={this.props.quizLeaderboardResult[course.id]} />
                            </TabPanel>
                            <TabPanel>
                                <Leaderboard leaderboardResult={this.props.practiceLeaderboardResult[course.id]} />
                            </TabPanel>
                        </Tabs>
                </div>
		);
	}
}

CourseSection.propTypes = {
    api: PropTypes.array
};
