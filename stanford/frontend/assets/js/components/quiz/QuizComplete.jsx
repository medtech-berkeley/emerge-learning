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
		this.state = {showConfetti: false, isLoading: true};
	}

	componentDidMount() {
		this.setState({isLoading: true});
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

		this.completionText = this.getCompletionText();
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

	getRandomInt(min, max) {
	    min = Math.ceil(min);
	    max = Math.floor(max);
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	getCompletionText() {
		let score =  this.props.num_correct / this.props.num_attempted;
		// console.log(score);
		var text70to100 = ["Golden touch!",
							"Marvelous work!",
							"Fabulous work!",
							"Brilliant work!",
							"Top notch!",
							"Epic EMT performance!"]

		var text40to69 = ["Super!",
						   "Awesome work!",
						   "Well done!"]
        
        var text0to39 = ["Great work!",
        				  "Good effort!",
        				  "Great job!"]

        if (score >= 70 && score <= 100) {
        	let index = this.getRandomInt(0, text70to100.length - 1);
        	return text70to100[index];
        }

		if (score >= 40 && score <= 69) {
        	let index = this.getRandomInt(0, text40to69.length - 1);
        	return text40to69[index];
        }

		if (score >= 0 && score <= 39) {
        	let index = this.getRandomInt(0, text0to39.length - 1);
        	return text0to39[index];
        }
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
				    		{this.completionText}
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