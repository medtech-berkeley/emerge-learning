import React from "react";
import Confetti from "react-dom-confetti";
import {Card, CardBody, CardHeader, CardFooter, Container, Row} from "reactstrap";
import {QuizResults} from "./QuizResults";
import PropTypes from "prop-types";

export class QuizComplete extends React.Component {
	constructor(props) {
		super(props);
		this.state = {showConfetti: false};
	}

	componentDidMount() {
		this.props.getResults(this.props.categoryId)

		this.config = {
		  angle: 100,
		  spread: 360,
		  startVelocity: 43,
		  elementCount: 127,
		  decay: 0.91
		};

		setInterval(
			() => this.shouldShowConfetti(), 1000
		);
	}

	shouldShowConfetti() {
		this.setState({
			showConfetti: this.props.num_correct == this.props.num_attempted
		});
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
                      <h4>Your Score: { this.props.num_correct } / { this.props.num_attempted }
                      <div id="confetti" style={{transform:"translateX(50%)"}}>
						<Confetti active={ this.state.showConfetti } config={ this.config }/>
					  </div>
                      </h4>
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