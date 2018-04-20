import React from "react";
import {Card, Nav, NavItem, NavLink, Navbar, NavbarBrand, NavbarToggler, Button, Container} from "reactstrap";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export class Graphs extends React.Component {
    render() {
        return (
            <div className="Graphs">
                <h2>Graphs</h2>
                <hr/>
                <Card>
                    <div className="card-body">
                        <ResponsiveContainer width='100%' height={300}>
                        <LineChart cx="50%" cy="50%" outerRadius="80%" data={this.props.data}>
                           <XAxis dataKey="day" />
                           <YAxis/>
                           <CartesianGrid strokeDasharray="3 3" />
                           <Tooltip />
                           <Line connectNulls={true} type="monotone" dataKey="points" stroke="black" />
                       </LineChart>
                   </ResponsiveContainer>
                </div>
                </Card>
            </div>);
    }
}
