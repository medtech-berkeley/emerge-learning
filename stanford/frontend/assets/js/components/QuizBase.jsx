import React from "react"
import {Card, CardBody, CardHeader, CardFooter, Container, Row, Col} from "reactstrap";
import PropTypes from "prop-types"

export class QuizCard extends React.Component {
	render() {
		return (
			<Container>
				<Card className="question">
				  <CardBody>
					<h4 className="card-title">EMT Training: Question 1</h4>
					<p className="card-text">You find an old woman passed out. Her lips are blue and she is holding some sort of inhaler. What do you do?</p>
					<Row>
					  <Col className="answer1 box">
						Kill her
					  </Col>
					  <Col class="answer2 box">
						Run away
					  </Col>
					</Row>
					<Row>
					  <Col class="answer3 box">
						Give CPR
					  </Col>
					  <Col class="answer4 box">
						Apply aloe-vera for a bullet wound to the head
					  </Col>
					</Row>
				  </CardBody>
			  </Card>
			</Container>
		);
	}
}

QuizCard.propTypes = {
    id: PropTypes.number,
	text: PropTypes.string,
	answers: PropTypes.array
};