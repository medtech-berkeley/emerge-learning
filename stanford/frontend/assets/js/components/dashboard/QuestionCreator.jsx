import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import { Container } from "reactstrap";


export class QuestionCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numQuestions: 1,  // Default to 1 question
      questions: []
    };
  }

  handleNumQuestionsChange = (event) => {
    this.setState({ numQuestions: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const questions = Array.from({ length: this.state.numQuestions }, (_, index) => ({
      id: index + 1,
      question: '',
      author: '',
      difficulty: 'easy',
      answers: ['', '', '', '']
    }));
    this.setState({ questions });
  };

  renderQuestionFields = () => {
    return this.state.questions.map((question, index) => (
      <div key={index} className="question-section">
        <div className="d-flex align-items-center question-fields">
          <div style={{ marginRight: '10px' }}>
            <label className="form-label">Question #{question.id}:</label>
            <input type="text" className="form-input" style={{ width: '500px' }} /> 
          </div>
          <div style={{ marginRight: '10px' }}>
            <label className="form-label">Author:</label>
            <input type="text" className="form-input" style={{ width: '300px' }} />
          </div>
          <div>
            <label className="form-label">Difficulty:</label>
            <select className="form-select">
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>
        <div className="d-flex align-items-center answer-fields">
          <div className="answer-option mr-3"> 
            <label className="form-label">Answer 1:</label>
            <input type="text" className="form-input" style={{ height: '50px', width: '200px' }} /> 
          </div>
          <div className="answer-option mr-3"> 
            <label className="form-label">Answer 2:</label>
            <input type="text" className="form-input" style={{ height: '50px', width: '200px' }} /> 
          </div>
          <div className="answer-option mr-3"> 
            <label className="form-label">Answer 3:</label>
            <input type="text" className="form-input" style={{ height: '50px', width: '200px' }} /> 
          </div>
          <div className="answer-option"> 
            <label className="form-label">Answer 4:</label>
            <input type="text" className="form-input" style={{ height: '50px', width: '200px' }} /> 
          </div>
        </div>
        <br />
        <br />
        <br />
      </div>
    ));
  };

  render() {
    return (
      <Container className="vh-100 d-flex flex-column" style={{ backgroundColor: '#d8e6ff' }}>
        <div>
          <h1 className="header">Question Creator</h1>
        </div>
        <div className="form-container">
          <b className="form-label">Enter Number of Questions Here:</b>
          <form onSubmit={this.handleSubmit}>
            <div className="d-flex align-items-center mt-2">
              <input
                name="numQuestions"
                type="number"
                min="1"
                value={this.state.numQuestions}
                onChange={this.handleNumQuestionsChange}
                className="form-input mr-2"
              />
              <button type="submit" className="submit-button">Submit</button>
            </div>
          </form>
          <br />
          {this.renderQuestionFields()}
          {/* Submit button at the bottom */}
          <div className="d-flex justify-content-center">
            <button className="submit-button-dark">Submit</button>
          </div>
        </div>
      </Container>
    );
  }
}