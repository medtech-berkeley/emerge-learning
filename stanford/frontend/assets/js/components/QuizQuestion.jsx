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
								  <div className="card-body" onClick={() => this.props.answerQuestion(this.props.id, answer.id, this.props.categoryId)}>
								    <p className="card-text">{answer.text}</p>
								  </div>
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