import React from "react";
import Confetti from "react-dom-confetti";
import {Card, CardBody, CardHeader, CardFooter, Container, Row} from "reactstrap";
import {QuizResults} from "./QuizResults";
import {Planet} from 'react-kawaii';
import PropTypes from "prop-types";
import { SuppressErrorBoundary } from "../errors/SuppressErrorBoundary";

export class QuizComplete extends React.Component {
	constructor(props) {
		super(props);
		this.state = {showConfetti: false};
	}

	componentDidMount() {
		this.props.getResults(this.props.categoryId);

		this.config = {
		  angle: 100,
		  spread: 360,
		  startVelocity: 40,
		  elementCount: 127,
		  decay: 0.91
		};
		 
		if (this.intervalId) {
			this.clearInterval(this.intervalId);
		}

		this.intervalId = setInterval(
			() => this.shouldShowConfetti(), 1000
		);
	}

	componentWillUnmount() {
		if (this.intervalId) {
			this.clearInterval(this.intervalId);
		}
	}

	shouldShowConfetti() {
		this.setState({
			showConfetti: this.props.num_correct / this.props.num_attempted >= 0.7
		});
	}

	clearInterval(number) {
		clearInterval(number);
	}

	render() {
		return (
			<SuppressErrorBoundary>
			<Container>
				<div className="card text-center">
				  <div className="card-header" style={{"height": "5.5rem"}}>
				  	<h3>
				  		<div className="floating" style={{"display": "inline-block", "marginRight": "20px"}}>
				  			<Planet size={60} mood="lovestruck" color="#70D7A3"/>
				  		</div>
				  		<div style={{"display": "inline-block", "transform": "translateY(-20px)"}}>
				    		Great Work!
				    	</div>
				    </h3>
				  </div>
				  <div className="card-body">
                      <h5 className="card-title">{ this.props.outoftime ? "You ran out of time to complete" : "You have successfully completed" } {this.props.name}.</h5>
                      <h4>Your Score: { this.props.num_correct } / { this.props.num_attempted }
                      <div id="confetti" style={{transform:"translateX(50%)"}}>
						<Confetti active={ this.state.showConfetti } config={ this.config }/>
					  </div>
                      </h4>
					  <Container>
						  <QuizResults results={ this.props.results } submitFeedback={this.props.submitFeedback}/>
					  </Container>
				  </div>
				</div>
			</Container>
			</SuppressErrorBoundary>
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