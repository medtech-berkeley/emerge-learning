import React from "react"
import {Card, CardBody, CardHeader, CardFooter, Container, Row, Col} from "reactstrap";
import PropTypes from "prop-types"

export class QuizQuestion extends React.Component {
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
							  <div className={"card card-answer "
                                    + (this.props.done && this.props.correct_answers.includes(answer.id) ? "card-answer-correct " : "")
                                    + (this.props.done && !this.props.correct_answers.includes(answer.id) ? "card-answer-incorrect " : "")
                                    + (this.props.done && this.props.selected === answer.id ? "card-answer-selected" : "")
							  }>

								{/*	If the user is done and this is the correct answer we want to make it green. */}
								{this.props.done && this.props.correct_answers.includes(answer.id) &&
									<Card body outline color="success" onClick={() => this.props.answerQuestion(this.props.id, answer.id, this.props.categoryId)}>
										<p className="card-text">{answer.text}</p>
									</Card>
								}
								{/*	If the user is done and they selected an incorrect answer we want to make it red. */}
								{this.props.done && this.props.selected === answer.id && !this.props.correct_answers.includes(answer.id) &&
									<Card body outline color="danger" onClick={() => this.props.answerQuestion(this.props.id, answer.id, this.props.categoryId)}>
										<p className="card-text">{answer.text}</p>
									</Card>
								}
								{/*We want to just render the rest of the answers:
									done and not correct and not selected
									not done render normally
									*/}
									{this.props.done && this.props.correct_answers.includes(answer.id) && this.props.selected !== answer.id &&
										<Card body outline color="success" onClick={() => this.props.answerQuestion(this.props.id, answer.id, this.props.categoryId)}>
											<p className="card-text">{answer.text}</p>
										</Card>
									}
									{!this.props.done &&
										<div className="card-body" onClick={() => this.props.answerQuestion(this.props.id, answer.id, this.props.categoryId)}>
											<p className="card-text">{answer.text}</p>
										</div>
									}
								</div>
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

{/*<div className={"answer-box"} style={{"background-color": this.getColor(i)}}>
									  {answer}
								  </div>*/}
