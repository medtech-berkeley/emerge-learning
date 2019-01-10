import React from "react";
import {Alert, Card, CardBody, CardHeader, Collapse, Container, Badge} from "reactstrap";
import PropTypes from "prop-types";

// CSRF TOKEN STUFF

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

var csrftoken = getCookie('csrftoken');

const CSRFToken = () => {
    return (
        <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
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
			<Container >
            <br/>
                   { this.state.submitted ?
                        
                        <Alert>Feedback submitted!</Alert> : 
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <CSRFToken />
                            <div className="form-group">
                              <input type="text" className="form-control" placeholder="Was this question confusing? Disagree with our answers? Let us know!" value={this.state.feedback} onChange={this.handleChange.bind(this)}/>
                            </div>
                            <button type="submit" className="btn btn-success">Submit Feedback</button>
                        </form>
                   }
			</Container>
		);
	}
}