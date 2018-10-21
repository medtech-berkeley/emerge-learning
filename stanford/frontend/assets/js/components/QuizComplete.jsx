import React from "react";
import {Card, CardBody, CardHeader, CardFooter, Container, Row} from "reactstrap";
import {QuizResults} from "./QuizResults";
import PropTypes from "prop-types";

export class QuizComplete extends React.Component {
	componentDidMount() {
		this.props.getResults(this.props.categoryId)
	}

	render() {
		return (
			<Container>
				<div className="card text-center">
				  <div className="card-header">
				  	<h3>
				    Great Work!
				    </h3>
				  </div>
				  <div className="card-body">
                      <h5 className="card-title">You have successfully completed {this.props.categoryId}.</h5>
                      <h4>Your Score: { this.props.num_correct } / { this.props.num_attempted } </h4>
					  <Container>
					  	<QuizResults results={ this.props.results }/>
					  </Container>
				  </div>
				</div>
			</Container>
		);
	}
}

QuizComplete.propTypes = {
  categoryId: PropTypes.number,
  num_attempted: PropTypes.number,
  num_correct: PropTypes.number,
	results: PropTypes.array,
	getResults: PropTypes.func
};