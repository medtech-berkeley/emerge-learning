import React from 'react';
import { render } from 'react-dom';
import { Button, Container, Row } from 'reactstrap';
import { FeedbackSummary } from "./FeedbackSummary";

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

export class Instructor extends React.Component {

    render() {
        return ( 
            <div>
                <Container style={{"textAlign": "center"}}>
                <h1> Upload Quizzes </h1> 
                <br/>
                    <p>Upload Questions</p>
                    <Row style={{"display": "inline-block"}}>
                    <Container outline color="success" size="sm">
                        <form method="POST" action="/instructor/uploadquestions/" encType="multipart/form-data" >
                        <CSRFToken />
                            <input type="file" name="file" accept=".csv"/>
                            <input type="submit" />
                        </form>
                    </Container> 
                    </Row>
                    <br/>
                    <br/>
                    <br/>
                    <p>Upload Categories</p>
                    <Row style={{"display": "inline-block"}}>
                    <Container outline color="success" size="sm" >
                        <form method="POST" action="/instructor/uploadcategories/" encType="multipart/form-data" >
                        <CSRFToken />
                            <input type="file" name="file" accept=".csv" />
                            <input type="submit" />
                        </form>
                    </Container>
                    </Row>  
                <br/>
                </Container>
                <FeedbackSummary getFeedbackSummary={this.props.getFeedbackSummary} feedback={this.props.feedback}/>
            </div>
        )
    }
}
