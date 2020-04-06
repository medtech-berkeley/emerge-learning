import React from 'react';
import { render } from 'react-dom';
import { Button, Container, Row } from 'reactstrap';
import { FeedbackSummary } from "./FeedbackSummary";
import Cookies from "js-cookie";

const CSRFToken = () => {
    return (
        <input type="hidden" name="csrfmiddlewaretoken" value={Cookies.get('csrftoken')} />
    );
};

export class QuestionUpload extends React.Component {

    render() {
        return (
            <center className=".d-inline-block">
                <h1>Upload Data</h1> 
                <br/>
                    <p>Upload Questions</p>
                    <Row style={{"display": "inline-block"}}>
                    <Container color="success" size="sm">
                        <form method="POST" action="/instructor/uploadquestions/" encType="multipart/form-data" >
                        <CSRFToken />
                            <input type="file" name="file" accept=".csv"/>
                            <input className="btn btn-success"  type="submit" />
                        </form>
                    </Container> 
                    </Row>
                    <br/>
                    <br/>
                    <br/>
                    <p>Upload Quizzes</p>
                    <Row style={{"display": "inline-block"}}>
                    <Container color="success" size="sm" >
                        <form method="POST" action="/instructor/uploadquizzes/" encType="multipart/form-data" >
                        <CSRFToken />
                            <input type="file" name="file" accept=".csv" />
                            <input className="btn btn-success" type="submit" />
                        </form>
                    </Container>
                    </Row>  
                <br/>
            </center>
        )
    }
}
