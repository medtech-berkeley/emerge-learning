import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import { Container } from "reactstrap";
import UpdateProfileContainer from '../../containers/UpdateProfileContainer'
import { UpdateCourses } from './UpdateCourses'

export class Settings extends React.Component {

  render() {
    return (
      <Container>
        <Tabs>
          <TabList>
            <Tab>Course Settings</Tab>
            <Tab>Profile Settings</Tab>
          </TabList>
          <TabPanel>
            <Container>
              <UpdateCourses />
            </Container>
          </TabPanel>
          <TabPanel>
            <Container>
              <UpdateProfileContainer />
            </Container>
          </TabPanel>
        </Tabs>
      </Container>
    );
  }
}
