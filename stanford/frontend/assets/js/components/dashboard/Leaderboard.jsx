import React from "react"
import {Card, CardBody, CardHeader, CardFooter, Container, Button} from "reactstrap";
import {Table} from 'reactstrap'
import {Image} from 'reactstrap'
import PropTypes from "prop-types"
import {Link} from "react-router-dom";
// import 'font-awesome/css/font-awesome.css'

export class Leaderboard extends React.Component {
	constructor(props) {
		super(props);
		this.getLeadboardList = this.getLeadboardList.bind(this);
  }

	getLeadboardList() {
		if (!Array.isArray(this.props.leaderboardResult)) {
			return [];
		}
		return this.props.leaderboardResult;
  }

  render() {
    return (
      <Table>
      <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
            <th>Location</th>
          </tr>
      </thead>
      <tbody>
            {/* {console.log(this.props)} */}
            {this.getLeadboardList().map(
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
                    {student.score}
                  </td>
                  <td>{student.location}</td>
               </tr>
               )
             }
            )} 
      </tbody>  
      </Table>
    );
  }
}