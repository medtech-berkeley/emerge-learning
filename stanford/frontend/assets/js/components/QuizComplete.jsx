import React from "react"
import {Card, CardBody, CardHeader, CardFooter, Container, Row} from "reactstrap";
import PropTypes from "prop-types"

export class QuizComplete extends React.Component {
	render() {
		return (
			<Container>
				<div class="card text-center">
				  <div class="card-header">
				  	<h3>
				    Great Work!
				    </h3>
				  </div>
				  <div class="card-body">
                      <h5 class="card-title">You have successfully completed {this.props.categoryId}.</h5>
                      <h4>Your Score: { this.props.num_correct } / { this.props.num_attempted } </h4>
				  </div>
				</div>
			</Container>
		);
	}
}

QuizComplete.propTypes = {
    categoryId: PropTypes.number,
    num_attempted: PropTypes.number,
    num_correct: PropTypes.number
};