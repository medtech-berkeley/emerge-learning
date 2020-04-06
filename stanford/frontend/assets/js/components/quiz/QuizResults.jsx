import React from "react";
import {Card, CardBody, CardHeader, Collapse, Container, Badge} from "reactstrap";
import PropTypes from "prop-types";
import {QuizQuestion} from "./QuizQuestion";
import {QuestionFeedback} from "../instructor/QuestionFeedback";
import { SuppressErrorBoundary } from "../errors/SuppressErrorBoundary";

export class QuizResults extends React.Component {
    constructor(props) {
      super(props);
      this.displayAnswer.bind(this);
    }

    displayAnswer(result, answer) {
        if(result.correct.includes(answer.id)) {
            return <p className="correct">{answer.text} <b>{"- Correct Answer"}</b></p>
        } else if (result.selected === answer.id) {
            return <p className="incorrect">{answer.text} <b>{"- Selected Answer"}</b></p>
        }
        else {
            return <p>{answer.text}</p>
        }
    }

	render() {
		return (
            <SuppressErrorBoundary>
			<Container>
                {this.props.results.map((result, i) => {
                    return (
                    <div className="text-left results-question">
                        <p>
                            { result.correct.includes(result.selected) ? <span className="correct check"><b>Correct</b></span> : <span className="incorrect x"><b>Incorrect</b></span> }
                            <br />
                            <strong>Question { i + 1 }: </strong> { result.text }
                        </p>
                        <br />
                        { result.answers.map((answer) => this.displayAnswer(result, answer)) }
                        {(result.explanation || result.reference) && 
                        <br />
                        }
                        {result.explanation &&
                        <p>
                            <strong>Explanation: </strong> { result.explanation }
                        </p>}
                        {result.reference_name &&
                        <p>
                            <strong>Reference: </strong> <a href={ result.reference_link }>{ result.reference_name }</a>
                        </p>}
                        <p>
                        {/* <QuestionFeedback question={result.text} submitFeedback={this.props.submitFeedback}/> */}
                        </p>
                        <hr></hr>
                    </div>
                    );
                    }
                )}
			</Container>
            </SuppressErrorBoundary>
		);
	}
}

QuizResults.propTypes = {
    results: PropTypes.array
};