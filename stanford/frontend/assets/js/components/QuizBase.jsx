import React from "react"
import {Card, CardBody, CardHeader, CardFooter, Container, Row, Col} from "reactstrap";
import PropTypes from "prop-types"
import { QuizQuestion } from "./QuizQuestion"
import { QuizComplete } from "./QuizComplete"

export class QuizBase extends React.Component {
	componentDidMount() {
		console.log("QuizBase did mount.");
		console.log(this.props.categoryId);
		this.props.getCategoryData(this.props.categoryId);
		this.props.getCurrentQuestion(this.props.categoryId);
	}

	render() {
		return (
			<div>
			{!this.props.complete && <QuizQuestion categoryId={this.props.categoryId}
                                                   text={this.props.currentQuestion.text}
                                                   answers={this.props.currentQuestion.answers}
                                                   id={this.props.currentQuestion.id}
                                                   answerQuestion={this.props.answerQuestion}
												   currentTime={this.props.currentTime}
												   timeStarted={this.props.timeStarted}
												   maxTime={this.props.maxTime}
												   />}
			{this.props.complete && <QuizComplete getResults={this.props.getResults}
                                                  categoryId={this.props.categoryId}
                                                  num_attempted={this.props.num_attempted}
                                                  num_correct={this.props.num_correct}
                                                  results={ this.props.results }/>}
			</div>
		);
	}
}

QuizBase.propTypes = {
    id: PropTypes.number,
	text: PropTypes.string,
	answers: PropTypes.array,
    category: PropTypes.number,
	num_attempted: PropTypes.number,
	num_correct: PropTypes.number,
	results: PropTypes.array,
    getCurrentQuestion: PropTypes.func,
    getCategoryData: PropTypes.func,
    answerQuestion: PropTypes.func,
    getResults: PropTypes.func,
	currentTime: PropTypes.number,
	timeStarted: PropTypes.number,
	maxTime: PropTypes.number,
};
