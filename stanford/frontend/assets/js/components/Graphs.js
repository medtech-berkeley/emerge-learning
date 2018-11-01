import React from "react";
import {Card, Nav, NavItem, NavLink, Navbar, NavbarBrand, NavbarToggler, Button, Container} from "reactstrap";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Legend, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import css from 'react-tabs/style/react-tabs.css';

export class Graphs extends React.Component {

    getSubjectData() {
      if (this.props.data.subjects) {
        return ([
          {name: 'Circulation', Accuracy: Number(this.props.data.subjects.circulation.percent_correct)},
          {name: 'Airway', Accuracy: Number(this.props.data.subjects.airway.percent_correct)},
          {name: 'Basic Procedures', Accuracy: Number(this.props.data.subjects.basicprocedures.percent_correct)},
          {name: 'EMS Knowledge', Accuracy: Number(this.props.data.subjects.emsknowledge.percent_correct)},
        ]);
      } else {
        return ([
          {name: 'Circulation', Accuracy: 1000},
          {name: 'Airway', Accuracy: 20},
          {name: 'Basic Procedures', Accuracy: 30},
          {name: 'EMS Knowledge', Accuracy: 20},
        ]);
      }
    }


    render() {
      console.log(this.props.data)
        return (
            <div className="Graphs">
                <p><b>Performance</b></p>
                <hr/>
                <Card>
                    <div className="card-body">
                    <Tabs>
                        <TabList>
                          <Tab>Percentage</Tab>
                        </TabList>
                        <TabPanel>
                          <ResponsiveContainer width='100%' height={350}>
                            <BarChart layout="vertical" width={600} height={300} data={this.getSubjectData()} margin={{top: 20, right: 20, left: 50, bottom: 5}}>
                               <CartesianGrid strokeDasharray="3 3"/>
                               <XAxis type="number" domain={[0, 100]}/>
                               <YAxis dataKey="name" type="category"/>
                               <Tooltip/>
                               <Legend />
                               <Bar dataKey="Accuracy" fill="#8884d8" />
                          </BarChart>
                        </ResponsiveContainer>
                        </TabPanel>
                    </Tabs>
                    </div>
                </Card>                
                <Card>
                    <div className="card-body">
                    <Tabs>
                        <TabList>
                          <Tab>Performance !!!!</Tab>
                          <Tab>Test</Tab>
                        </TabList>
                        <TabPanel>
                          <ResponsiveContainer width='100%' height={350}>
                            <BarChart width={600} height={300} data={bardata} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
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

const bardata = [
  {name: 'All Time', correct: 4000, incorrect: 2400},
  {name: 'Last Month', correct: 2300, incorrect: 2000},
  {name: 'Last Week', correct: 700, incorrect: 300},
  {name: 'Last Day', correct: 100, incorrect: 90},
];

const linedata = [
      {name: '6/21', points: 320},
      {name: '6/22', points: 200},
      {name: '6/23', points: 40},
      {name: '6/24', points: 70},
      {name: '6/25', points: 430},
      {name: '6/26', points: 40},
      {name: '6/27', points: 150},
];