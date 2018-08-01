import React from "react";
import {Card, CardBody, CardHeader, Collapse, Container, Badge} from "reactstrap";
import PropTypes from "prop-types";
import {QuizQuestion} from "./QuizQuestion";

export class QuizResults extends React.Component {
    constructor(props) {
      super(props);
      this.toggle = this.toggle.bind(this);
      this.state = { collapse: null };
    }

    toggle(e) {
      let event = e.target.dataset.event;
      this.setState({ collapse: this.state.collapse === Number(event) ? null : Number(event) });
    }

	render() {
		return (
			<Container>
                {this.props.results.map((result, i) =>
                    <Card>
                      <CardHeader onClick={this.toggle} data-event={i} className="hover-hand">
                          <h3 className="hover-hand" onClick={this.toggle} data-event={i}>Question {i} -- 
                              {
                                result.correct.includes(result.selected) ?
                                <Badge color='success'>Correct</Badge> :
                                <Badge color='danger'>Incorrect</Badge> 
                              } 
                          </h3>
                      </CardHeader>
                      <CardBody>
                          <Collapse isOpen={this.state.collapse === i}>
                            <QuizQuestion id={i} answerQuestion={() => null} text={result.text} answers={result.answers} correct_answers={result.correct} selected={result.selected} done={true} />
                          </Collapse>
                      </CardBody>
                    </Card>
                )}
			</Container>
		);
	}
}

QuizResults.propTypes = {
    results: PropTypes.array
};