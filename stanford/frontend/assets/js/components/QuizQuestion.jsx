import React from "react"
import {Card, CardBody, CardHeader, CardFooter, Container, Row, Col} from "reactstrap";
import PropTypes from "prop-types"

export class QuizQuestion extends React.Component {
	constructor(props) {
      super(props);
      this.getQuestion.bind(this);
      this.getAnswerClass.bind(this);
    }

	getQuestion(answer) {
		if(this.props.done) {
			if (this.props.correct_answers.includes(answer.id)) {
				return (
					<Card outline color="success" className={"card-answer " + this.getAnswerClass(answer.id)} onClick={() => this.props.answerQuestion(this.props.id, answer.id, this.props.categoryId)}>
						<p className="card-text">{answer.text}</p>
					</Card>);
			} else if (this.props.selected === answer.id) {
				return (
					<Card outline color="danger" className={"card-answer " + this.getAnswerClass(answer.id)} onClick={() => this.props.answerQuestion(this.props.id, answer.id, this.props.categoryId)}>
						<p className="card-text">{answer.text}</p>
					</Card>);
			}

		}

		return (
			<Card className={"card-answer " + this.getAnswerClass(answer.id)} onClick={() => this.props.answerQuestion(this.props.id, answer.id, this.props.categoryId)}>
				<p className="card-text">{answer.text}</p>
			</Card>);
	}

	getAnswerClass(answer) {
		let answerClasses = "";
		if(this.props.done) {
			if(this.props.correct_answers.includes(answer.id)) {
				answerClasses += "card-answer-correct ";
			}
			if (!this.props.correct_answers.includes(answer.id)) {
				answerClasses += "card-answer-incorrect ";
			}
			if (this.props.selected === answer.id) {
				answerClasses += "card-answer-selected";
			}
		}
		return answerClasses;
	}

	render() {
		return (
			<Container>
				<Card className="question">
				  <CardBody>
                    { this.props.done ? null : <h4 className="card-title">{this.props.categoryId}: Question 1</h4> }
					<p className="card-text">{this.props.text}</p>
				  	<Row>
					  {
						  this.props.answers.map((answer, i) =>(
						  <Col md={6} sm={12} key={i}>
						  	{ this.getQuestion(answer) }
						  </Col>))
					  }
				    </Row>
				  </CardBody>
			  </Card>
			</Container>
		);
	}
}

QuizQuestion.propTypes = {
    id: PropTypes.number,
	text: PropTypes.string,
	answers: PropTypes.array,
    category: PropTypes.number,
	correct_answers: PropTypes.array,
    selected: PropTypes.number,
    done: PropTypes.bool
};