import React from "react"
import {Card, CardBody, CardHeader, CardFooter, Container, Row, Col} from "reactstrap";
import PropTypes from "prop-types"

export class QuizQuestion extends React.Component {
	IMAGE = "IMG";
	VIDEO = "VID";


	getMediaField() {
		if (this.props.media) {
			switch (this.props.media.media_type) {
				case this.IMAGE:
					return <img src={this.props.media.media_file} className="question-media" />;
				case this.VIDEO:
					return (
						<video controls className="question-media">
							<source src={this.props.media.media_file} type="video/mp4" />
						</video>
					); 
			}
		}
		return null;
	}

	getSecondsLeft() {
		return this.props.maxTime - (this.props.currentTime - this.props.timeStarted);
	}

	minutes() {
		return Math.floor(this.getSecondsLeft() / 60.0);
	}

	seconds() {
		let seconds = this.getSecondsLeft() % 60;
		return seconds >= 10 ? seconds : "0" + seconds;
	}

	showTimer() {
		if (this.getSecondsLeft() <= 0) {
			this.props.endQuiz();
		}

		return (
			<div style={{"display": "inline-block", "float":"right"}}>
			<i className="fa fa-clock-o" style={{"paddingRight": "8px"}} aria-hidden="true"></i>
			Time Remaining: {this.minutes()}:{this.seconds()}</div>
		);
	}

	render() {
		return (
			<Container>
				<Card className="question">
				  <CardBody>
					{/* TODO: add support for listing question no */}
					<span>
					  <h4 className="card-title" style={{"display": "inline-block"}}>{this.props.name}</h4>
					  { this.showTimer() }
					 </span>
					<Row>
						<div className="media-box">
							{this.getMediaField()}
						</div>
					</Row>
					<Row>
						<div>
							<p className="card-text question-text">{this.props.text}</p>
						</div>
					</Row>
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
	name: PropTypes.string,
	answers: PropTypes.array,
	media: PropTypes.object,
  category: PropTypes.number,
	correct_answers: PropTypes.array,
  selected: PropTypes.number,
  currentTime: PropTypes.number,
  maxTime: PropTypes.number,
	timeStarted: PropTypes.number,
	endQuiz: PropTypes.func
};
