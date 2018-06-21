import React from "react"
import {Card, CardBody, CardHeader, CardFooter, Container, Row, Col} from "reactstrap";
import PropTypes from "prop-types"
import { QuizQuestion } from "./QuizQuestion"
import { QuizComplete } from "./QuizComplete"

export class QuizBase extends React.Component {
	componentDidMount() {
		console.log("QuizBase did mount.")
		console.log(this.props.categoryId)
		this.props.getCurrentQuestion(this.props.categoryId)
	}

	render() {
		return (
			<div>
			{!this.props.complete && <QuizQuestion categoryId={this.props.categoryId} currentQuestion={this.props.currentQuestion} answerQuestion={this.props.answerQuestion}/>}
			{this.props.complete && <QuizComplete categoryId={this.props.categoryId} num_attempted={this.props.num_attempted} num_correct={this.props.num_correct}/>}
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
	num_correct: PropTypes.number
};