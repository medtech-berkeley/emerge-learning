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

        const dateNow = Date.now();

        const questionUserArr = (this.props.questionUserData.filter((singleQuestion) => {
          return (singleQuestion["student"]["user"]["username"] == (this.props.user.user ? this.props.user.user.username : 'Error'));
        }));

        const sortedQuestions = questionUserArr.map((singleQuestion) => {
          return [singleQuestion["answer"]["is_correct"], Date.parse(singleQuestion["time_completed"])];
        })
        var questionBucket = 
        {
          "correct":{
            "total":0,
            "month":0,
            "week":0,
            "day6":0,"day5":0,"day4":0,"day3":0,"day2":0,"day1":0,"day0":0
            },
          "incorrect":{
            "total":0,
            "month":0,
            "week":0,
            "day":0
            }
          }
        for (var i=0; i < sortedQuestions.length; i++) {
          var dateQ = sortedQuestions[i][1];
          if (sortedQuestions[i][0]) {
            questionBucket["correct"]["total"] += 1;
            if (dateQ > (dateNow - 2592000000)) {
              questionBucket["correct"]["month"] += 1;
              if (dateQ > (dateNow - 604800000)) {
                questionBucket["correct"]["week"] += 1;
                if (dateQ < (dateNow - 86400000 * 6)) {
                  questionBucket["correct"]["day6"] += 1;
                } else if (dateQ < (dateNow - 86400000 * 5)) {
                  questionBucket["correct"]["day5"] += 1;
                } else if (dateQ < (dateNow - 86400000 * 4)) {
                  questionBucket["correct"]["day4"] += 1;
                } else if (dateQ < (dateNow - 86400000 * 3)) {
                  questionBucket["correct"]["day3"] += 1;
                } else if (dateQ < (dateNow - 86400000 * 2)) {
                  questionBucket["correct"]["day2"] += 1;
                } else if (dateQ < (dateNow - 86400000 * 1)) {
                  questionBucket["correct"]["day1"] += 1;
                } else {
                  questionBucket["correct"]["day0"] += 1;
                }
              }
            }
          } else {
            questionBucket["incorrect"]["total"] += 1;
            if (dateQ > (dateNow - 2592000000)) {
              questionBucket["incorrect"]["month"] += 1;
              if (dateQ > (dateNow - 604800000)) {
                questionBucket["incorrect"]["week"] += 1;
                if (dateQ > (dateNow - 86400000)) {
                  questionBucket["incorrect"]["day"] += 1;
                }
              }
            }
          }
        }
        
        const bardata = [
          {name: 'All Time', 
           correct: questionBucket["correct"]["total"], 
           incorrect: questionBucket["incorrect"]["total"]},
          {name: 'Last Month', 
           correct: questionBucket["correct"]["month"], 
           incorrect: questionBucket["incorrect"]["month"]},
          {name: 'Last Week',
           correct: questionBucket["correct"]["week"],
           incorrect: questionBucket["incorrect"]["week"]},
          {name: 'Last Day', 
           correct: questionBucket["correct"]["day0"],
           incorrect: questionBucket["incorrect"]["day"]},
        ];

        function strDate(aDate) {
          var myDate = new Date(aDate);
          return String((myDate.getMonth() + 1)) + '/' + String(myDate.getDate());
        }

        const linedata = [
              {name: strDate(dateNow - 86400000*6), points: questionBucket["correct"]["day6"]},
              {name: strDate(dateNow - 86400000*5), points: questionBucket["correct"]["day5"]},
              {name: strDate(dateNow - 86400000*4), points: questionBucket["correct"]["day4"]},
              {name: strDate(dateNow - 86400000*3), points: questionBucket["correct"]["day3"]},
              {name: strDate(dateNow - 86400000*2), points: questionBucket["correct"]["day2"]},
              {name: strDate(dateNow - 86400000), points: questionBucket["correct"]["day1"]},
              {name: strDate(dateNow), points: questionBucket["correct"]["day0"]},
        ];

      console.log(this.props.data)

        return (
            <div className="Graphs">
                <p><b>Performance</b></p>
                <hr/>
                <Card>
                    <div className="card-body">
                    <Tabs>
                        <TabList>
                          <Tab>Performance By Subject</Tab>
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
                               <Bar dataKey="correct" fill="#8884d8" />
                               <Bar dataKey="incorrect" fill="#82ca9d" />
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