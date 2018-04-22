import React from "react"
import {Card, CardBody, CardHeader, CardFooter, Container, Row, Col} from "reactstrap";
import PropTypes from "prop-types"

export class QuizBase extends React.Component {

	getColor(i) {
		let colors = ['red', 'green', 'blue', '#CCCC00'];
		return colors[i % colors.length];
	}

	render() {
		return (
			<Container>
				<Card className="question">
				  <CardBody>
					<h4 className="card-title">EMT Training: Question 1</h4>
					<p className="card-text">{this.props.text}</p>
				  	<Row>
					  {
						  this.props.answers.map((answer, i) =>(
						  <Col md={6} sm={12} key={i}>
							  <div class="card card-answer">
								  <div class="card-body">
								    <p class="card-text">{answer}</p>
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

QuizBase.propTypes = {
    id: PropTypes.number,
	text: PropTypes.string,
	answers: PropTypes.array,
    category: PropTypes.number
};

{/*<div className={"answer-box"} style={{"background-color": this.getColor(i)}}>
									  {answer}
								  </div>*/}