import React from "react";
import {Card, Nav, NavItem, NavLink, Navbar, NavbarBrand, NavbarToggler, Button, Container} from "reactstrap";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Legend, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import css from 'react-tabs/style/react-tabs.css';

export class Graphs extends React.Component {
    getPracticePerformance() {
      return this.props.data.practice_subjects;
    }

    getQuizPerformance() {
      return this.props.data.quiz_subjects;
    }

    getBarData() {
      let performance = this.props.data.performance;
      console.log(this.props.data);
      if (!performance) {
        return [];
      }
      return  [
        {name: 'All Time',
         correct: performance['all_time']['num_correct'],
         incorrect: performance['all_time']['num_attempted'] - performance['all_time']['num_correct']},
        {name: 'This Month',
         correct: performance['this_month']['num_correct'],
         incorrect: performance['this_month']['num_attempted'] - performance['this_month']['num_correct']},
        {name: 'This Week',
         correct: performance['week']['num_correct'],
         incorrect: performance['week']['num_attempted'] - performance['week']['num_correct']},
        {name: 'Today',
          correct: performance['day']['num_correct'],
          incorrect: performance['day']['num_attempted'] - performance['day']['num_correct']},
      ];
    }

    getLineData() {
      if(!this.props.data.performance_breakdown) {
        return [];
      }

      const line_data = [];
      for (const day of this.props.data.performance_breakdown) {
        line_data.push({name: day["day"], points: day["points"]})
      }
      return line_data;
    }

    render() {
        var bardata = this.getBarData();
        var linedata = this.getLineData();

        return (
            <div className="Graphs">
                <p><b>Performance</b></p>
                <hr/>
                <Card>
                    <div className="card-body">
                    <Tabs>
                        <TabList>
                          <Tab>Practice Performance</Tab>
                          <Tab>Quiz Performance</Tab>
                        </TabList>

                        <TabPanel>
                          <ResponsiveContainer width='100%' height={350}>
                            <BarChart layout="vertical" width={600} height={300} data={this.getPracticePerformance()} margin={{top: 20, right: 20, left: 50, bottom: 5}}>
                               <CartesianGrid strokeDasharray="3 3"/>
                               <XAxis type="number" domain={[0, 1]}/>
                               <YAxis dataKey="name" type="category" width={80}/>
                               <Tooltip/>
                               <Legend />
                               <Bar dataKey="Accuracy" fill="#8884d8" />
                          </BarChart>
                        </ResponsiveContainer>
                        </TabPanel>

                        <TabPanel>
                          <ResponsiveContainer width='100%' height={350}>
                            <BarChart layout="vertical" width={600} height={300} data={this.getQuizPerformance()} margin={{top: 20, right: 20, left: 50, bottom: 5}}>
                               <CartesianGrid strokeDasharray="3 3"/>
                               <XAxis type="number" domain={[0, 1]}/>
                               <YAxis dataKey="name" type="category" width={80}/>
                               <Tooltip/>
                               <Legend />
                               <Bar dataKey="Accuracy" fill="#8884d8" />
                          </BarChart>
                        </ResponsiveContainer>
                        </TabPanel>

                    </Tabs>
                    </div>
                </Card>
                <br/>
                <Card>
                    <div className="card-body">
                    <Tabs>
                        <TabList>
                          <Tab>Performance Over Time (Bar)</Tab>
                          <Tab>Performance Over Time (Line)</Tab>
                        </TabList>
                        <TabPanel>
                          <ResponsiveContainer width='100%' height={350}>
                            <BarChart width={600} height={300} data={bardata} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                               <CartesianGrid strokeDasharray="3 3"/>
                               <XAxis dataKey="name"/>
                               <YAxis />
                               <Tooltip/>
                               <Legend />
                               <Bar dataKey="correct" fill="#76C59D" />
                               <Bar dataKey="incorrect" fill="#B3B3B3" />
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