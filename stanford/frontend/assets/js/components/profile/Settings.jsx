import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import { Container } from "reactstrap";
import { UpdateProfileContainer } from '../../containers/UpdateProfileContainer'
import { EmailSender } from '../instructor/EmailSender'
import { UpdateCourses } from './UpdateCourses'

export class Settings extends React.Component {

    render() {
        return ( 
            <Container>
                <Tabs>
                    <TabList>
                        <Tab>Send Email</Tab>
                        <Tab>Profile Settings</Tab>
                        <Tab>Course Settings</Tab>
                    </TabList>
                    <TabPanel>
                        <Container>
                            <EmailSender />
                        </Container>
                    </TabPanel>
                    <TabPanel>
                        <Container>
                            <UpdateProfileContainer />
                        </Container>
                    </TabPanel>
                    <TabPanel>
                        <Container>
                            <UpdateCourses />
                        </Container>
                    </TabPanel>
                </Tabs>
            </Container>
        );
    }
}
