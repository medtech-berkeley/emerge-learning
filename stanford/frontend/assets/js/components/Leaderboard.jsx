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
            <th>Name</th>
            <th>Score</th>
            <th>Location</th>
            <th>Status</th>
          </tr>
      </thead>
      <tbody>
            {this.props.leaderboardResult.map(
               function(student, index){
                return (
                <tr className={"row-" + index.toString()}>
                  <td className={"leaderboard-rank-" + index.toString()}>
                    <b>{index + 1}</b>
                  </td>
                  <td>
                    <img src={student.image} className="icon-img img-circle" width="30" height="30"/>
                    {student.name}
                  </td>
                  <td className="leaderboard-score">
                    {student.num_correct}
                  </td>
                  <td>{student.location}</td>
                  <td>Student</td>
               </tr>
               )
             }
            )} 
      </tbody>  
      </Table>
    );
  }
}