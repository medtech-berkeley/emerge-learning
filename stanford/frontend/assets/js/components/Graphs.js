import React from "react";
import {Card, Nav, NavItem, NavLink, Navbar, NavbarBrand, NavbarToggler, Button, Container} from "reactstrap";
import { LineChart, Line, XAxis, YAxis, Legend, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export class Graphs extends React.Component {
    render() {
        return (
            <div className="Graphs">
                <p><b>Statistics</b></p>
                <hr/>
                <p>Questions Answered: {this.props.data[0].questions_answered}</p>
                <p>Number Correct: {this.props.data[0].num_correct}</p>
                <p>Number Incorrect: {this.props.data[0].num_incorrect}</p>
                <Card>
                    <div className="card-body">
                        <ResponsiveContainer width='100%' height={350}>
                        <LineChart cx="50%" cy="50%" outerRadius="80%" data={this.props.data}>
                           <XAxis label={{ value: 'Day', angle: 0, position: 'insideBottom', offset:0 }} dataKey="day" />
                           <YAxis label={{ value: 'Points', angle: -90, position: 'insideLeft' }} dataKey="points"/>
                           <CartesianGrid strokeDasharray="3 3" />
                          <Tooltip />
                           <Line connectNulls={true} type="monotone" dataKey="points" stroke="#82ca9d " />
                       </LineChart>
                   </ResponsiveContainer>
                </div>
                </Card>
            </div>);
    }
}
