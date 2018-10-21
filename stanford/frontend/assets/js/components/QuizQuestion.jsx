import React from "react"
import {Card, CardBody, CardHeader, CardFooter, Container, Row, Col} from "reactstrap";
import PropTypes from "prop-types"

export class QuizQuestion extends React.Component {
	getTimeLeft(){
		return this.props.currentTime;
	}
	render() {
		return (
			<Container>
				<Card className="question">
				  <CardBody>
                    {/* TODO: add support for listing question no */}
                    <h4 className="card-title">{this.props.categoryId}</h4>
					<p className="card-text">{this.props.text}</p>
				<p className="card-text">{this.getTimeLeft()}</p>
				  	<Row>
					  {
						  this.props.answers.map((answer, i) =>(
						  <Col md={6} sm={12} key={i}>
							  <div className="card card-answer">
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
	currentTime: PropTypes.number,
	timeStarted: PropTypes.number,
	maxTime: PropTypes.number,
};
