import React from "react";
import {Card, Dropdown, Nav, NavItem, NavLink, Navbar, NavbarBrand, NavbarToggler, Button, Container, Row, Col} from "reactstrap";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Legend, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import 'react-tabs/style/react-tabs.css';

export class Graphs extends React.Component {
    renderBarChart() {
        return (
            [{name: 'All Time', correct: this.props.data.num_correct, incorrect: this.props.data.num_incorrect},
            {name: 'Last Month', correct: 1, incorrect: 0},
            {name: 'Last Week', correct: 1, incorrect: 0},
            {name: 'Last Day', correct: 0, incorrect: 0}]
        )
    }

    render() {
        return (
            <div className="Graphs">
                <p><b>Performance</b></p>
                <hr/>
                <p>Questions Answered: {this.props.data.questions_answered}</p>
                <p>Number Correct: {this.props.data.num_correct}</p>
                <p>Number Incorrect: {this.props.data.num_incorrect}</p>
                <Card>
                    <div className="card-body">
                    <Row>
                        <Col xs="6">
                            <Select
                                name="form-field-name"
                                placeholder='Filter by tag'
                                value=''
                                // onChange={this.handleChange}
                                options={[
                                  { value: 'one', label: 'One' },
                                  { value: 'two', label: 'Two' },
                                  ]}
                            />
                        </Col>
                        <Col xs="6">
                            <Select
                                name="form-field-name"
                                placeholder='Filter by difficulty'
                                value=''
                                // onChange={this.handleChange}
                                options={[
                                  { value: 'one', label: 'One' },
                                  { value: 'two', label: 'Two' },
                                  ]}
                            />
                        </Col>
                    </Row>
                    <br/>
                    <Tabs>
                        <TabList>
                          <Tab>Bar Chart</Tab>
                          <Tab>Line Graph</Tab>
                        </TabList>
                        <TabPanel>
                          <ResponsiveContainer width='100%' height={350}>
                            <BarChart width={600} height={300} data={this.renderBarChart()} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                               <CartesianGrid strokeDasharray="3 3"/>
                               <XAxis dataKey="name"/>
                               <YAxis />
                               <Tooltip/>
                               <Legend />
                               <Bar dataKey="correct" stackId="a" fill="#8884d8" />
                               <Bar dataKey="incorrect" stackId="a" fill="#82ca9d" />
                          </BarChart>
                        </ResponsiveContainer>
                        </TabPanel>
                        <TabPanel>
                          <ResponsiveContainer width='100%' height={350}>
                            <LineChart width={600} height={300} data={linedata}margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                               <XAxis dataKey="name"/>
                               <YAxis/>
                               <CartesianGrid strokeDasharray="3 3"/>
                               <Tooltip/>
                               <Legend />
                               <Line type="monotone" dataKey="points" stroke="#8884d8" activeDot={{r: 8}}/>
                            </LineChart>
                        </ResponsiveContainer>
                        </TabPanel>
                    </Tabs>
                    </div>
                </Card>
            </div>);
    }
}

const linedata = [
      {name: '6/21', points: 320},
      {name: '6/22', points: 200},
      {name: '6/23', points: 40},
      {name: '6/24', points: 70},
      {name: '6/25', points: 430},
      {name: '6/26', points: 40},
      {name: '6/27', points: 150},
];