import React from 'react';
import { render } from 'react-dom';
import { Button, Container, Row, Input, FormGroup, Label, Form, Carousel, Jumbotron, FormText} from 'reactstrap';
import { FeedbackSummary } from "./FeedbackSummary";
import Cookies from "js-cookie";

const CSRFToken = () => {
    return (
        <input type="hidden" name="csrfmiddlewaretoken" value={Cookies.get('csrftoken')} />
    );
};

function Step1(props) {
    if (props.currentStep !== 1) {
        return null;
    }
    return (
        <Form method="POST" action="/instructor/uploadquizzes/" encType="multipart/form-data">
            <CSRFToken />
            <FormGroup>
                <h4>Upload Quizzes</h4>
                <p >Download quiz template <a href="https://drive.google.com/uc?export=download&id=1sSsjKh6f48aeE8oA0ZJVc-8W1ASFIUae">here</a></p>
                <Input type="file" name="file" accept=".csv" />
                <Button color='success'>Submit</Button>
            </FormGroup>
        </Form>
    )
};

function Step2(props) {
    if (props.currentStep !== 2) {
        return null;
    }
    return (
        <Form method="POST" action="/instructor/uploadquestions/" encType="multipart/form-data">
            <CSRFToken />
            <FormGroup>
                <h4>Upload Questions</h4>
                <p >Download question template <a href="https://drive.google.com/uc?export=download&id=1CIc7EOKPXKY1U3XqNTP4sEh3WVPoH8no">here</a></p>
                <Input type="file" name="file" accept=".csv"/>
                <Button color='success'>Submit</Button>
            </FormGroup>
        </Form>
    )
};

export class QuestionUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: 1,
        }
    }

    _next = () => {
        let currentStep = this.state.currentStep
        currentStep = currentStep >= 2? 3: currentStep + 1
        this.setState({
          currentStep: currentStep
        })
      }
        
      _prev = () => {
        let currentStep = this.state.currentStep
        currentStep = currentStep <= 1? 1: currentStep - 1
        this.setState({
          currentStep: currentStep
        })
      }
    
    /*
    * the functions for our button
    */
    previousButton() {
      let currentStep = this.state.currentStep;
      if(currentStep !==1){
        return (
          <Button color="secondary" onClick={this._prev}>Previous</Button>
        )
      }
      return null;
    }
    
    nextButton(){
      let currentStep = this.state.currentStep;
      if(currentStep !==2){
        return (
        <Button color="secondary" onClick={this._next}>Next</Button>
        )
      }
      return null;
    }

    render() {
        return (
            <center className=".d-inline-block">
                <h1>Upload Data</h1>
                <p className="lead">Upload quizzes first, then click <strong>next</strong> to upload questions!</p>
                <hr className="my-2" />
                <Row style={{"display": "inline-block"}}>
                    <Step1 currentStep={this.state.currentStep}/>
                    <Step2 currentStep={this.state.currentStep}/>
                    <br />
                    {this.previousButton()}
                    {this.nextButton()}
                </Row>
            </center>
        )
    }
}
