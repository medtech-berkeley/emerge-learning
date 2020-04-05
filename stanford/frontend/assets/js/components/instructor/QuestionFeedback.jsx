import React from "react";
import {Alert, Card, CardBody, CardHeader, Collapse, Container, Badge} from "reactstrap";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

const CSRFToken = () => {
    return (
        <input type="hidden" name="csrfmiddlewaretoken" value={Cookies.get('csrftoken')} />
    );
};

export class QuestionFeedback extends React.Component {
    constructor(props) {
        super(props);
        this.state = {feedback: "", question: "", submitted: false}
    }

    handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
        this.props.submitFeedback(this.state.feedback, this.state.question);
        this.setState({submitted: true});
    }

    handleChange(event) {
        this.setState({feedback: event.target.value, question: this.props.question});
    }

	render() {
		return (
			<Container>
            <br/>
                   { this.state.submitted ?
                        <Alert>Feedback submitted!</Alert> : 
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <CSRFToken />
                            <div className="form-group">
                              <input type="text" className="form-control" placeholder="If you have any feedback regarding this question, please let us know!" value={this.state.feedback} onChange={this.handleChange.bind(this)}/>
                            </div>
                            <button type="submit" className="btn btn-success">Submit Feedback</button>
                        </form>
                   }
			</Container>
		);
	}
}