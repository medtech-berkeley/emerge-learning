import React from "react"
import {Card, CardBody, CardHeader, CardFooter, Container, Button} from "reactstrap";
import {Table} from 'reactstrap'
import {Image} from 'reactstrap'
import PropTypes from "prop-types"
import {Link} from "react-router-dom";
// import 'font-awesome/css/font-awesome.css'

export class Leaderboard extends React.Component {
  render() {
    return (
      <Table>
      <thead>
          <tr>
            <th>Rank</th>
            <th>Change</th>
            <th>Name</th>
            <th>Score</th>
            <th>Location</th>
            <th>Occupation</th>
          </tr>
      </thead>
      <tbody>
            {this.props.students.map(
               function(student, index){
                return (
                <tr className={"row-" + index.toString()}>
                  <td className={"leaderboard-rank-" + index.toString()}>
                    <b>{index + 1}</b>
                  </td>
                  <td>
                    {(student.name == "Mocha Vasudevan" || student.name == "Ethan Teo") && <i className="fa fa-caret-up"></i>}
                    {(student.name != "Mocha Vasudevan" && student.name != "Ethan Teo") && <i className="fa fa-caret-down"></i>}
                    {Math.floor((Math.random() * 10)/2) + 1}
                  </td>
                  <td>
                    <img src={student.image} className="icon-img img-circle" width="30" height="30"/>
                    {student.name}
                  </td>
                  <td className="leaderboard-score">
                    {Math.floor((Math.random() * 100)/(3*index+1)) + 1}
                  </td>
                  <td>{student.location}</td>
                  <td>{student.description}</td>
               </tr>
               )
             }
            )} 
      </tbody>  
      </Table>
    );
  }
}