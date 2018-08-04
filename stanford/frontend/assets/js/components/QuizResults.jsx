import React from "react";
import {Card, CardBody, CardHeader, Collapse, Container, Badge} from "reactstrap";
import PropTypes from "prop-types";
import {QuizQuestion} from "./QuizQuestion";

export class QuizResults extends React.Component {
    constructor(props) {
      super(props);
      this.displayAnswer.bind(this);
    }

    displayAnswer(result, answer) {
        if(result.correct.includes(answer.id)) {
            return <p className="correct">{answer.text}</p>
        } else if (result.selected === answer.id) {
            return <p className="incorrect">{answer.text}</p>
        }
        else {
            return <p>{answer.text}</p>
        }
    }

	render() {
		return (
			<Container>
                {this.props.results.map((result, i) => {
                    return (
                    <div className="text-left results-question">
                        <p>
                            <strong>Question { i + 1 }: </strong> { result.text } { result.correct.includes(result.selected) ? <span class="correct check">CORRECT</span> : <span className="incorrect x">INCORRECT</span> }
                        </p>
                        { result.answers.map((answer) => this.displayAnswer(result, answer)) }
                    </div>);
                    }
                )}
			</Container>
		);
	}
}

QuizResults.propTypes = {
    results: PropTypes.array
};