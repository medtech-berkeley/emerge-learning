import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import { FeedbackSummary } from "./FeedbackSummary";
import { QuestionUpload } from "./QuestionUpload";
import { Container } from "reactstrap";
import UserManagementAPI from '../../containers/instructor/UserManagementAPI';

export class Instructor extends React.Component {

    render() {
        return ( 
            <Container>
                <Tabs>
                    <TabList>
                        <Tab>Upload Questions</Tab>
                        <Tab>View Feedback</Tab>
                        <Tab>User Management</Tab>
                    </TabList>
                    <TabPanel>
                        <Container>
                            <QuestionUpload />
                        </Container>
                    </TabPanel>
                    <TabPanel>
                        <Container>
                            <FeedbackSummary getFeedbackSummary={this.props.getFeedbackSummary} feedback={this.props.feedback}/>
                        </Container>
                    </TabPanel>
                    <TabPanel>
                        <Container>
                            <UserManagementAPI />
                        </Container>
                    </TabPanel>
                </Tabs>
            </Container>
        );
    }
}
