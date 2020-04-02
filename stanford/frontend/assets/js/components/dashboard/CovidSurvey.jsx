import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';
import {Planet} from 'react-kawaii';

export class CovidSurvey extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
  	event.preventDefault();
  	// console.log(event.target);
    this.props.submitCovidSurvey(event.target);
  }

  render() {
    return (
      <div>
		<Modal isOpen={this.props.covid_survey_required} className={this.props.className}>
        <form onSubmit={this.handleSubmit}>

          <ModalHeader>
          	COVID19 Demographic Survey

          	<div className="floating"
          		 style=
          		 {
          			{"display": "inline-block", "marginRight": "20px", "position": "absolute", "top": "1rem", "right": "1rem"}
          		 }>
				<Planet size={30} mood="excited" color="#70D7A3"/>
			</div>

          </ModalHeader>
          <ModalBody>

          <p className="form-text">
            Please fill out this additional information regarding COVID-19.
          </p>

          <br />
			  <div className="form-group">
			    <label for="">Is this the first time you are about to play a game related to work?</label>
				<select className="form-control" name="game_related_work">
				  <option value="True">Yes</option>
				  <option value="False">No</option>
				</select>
			  </div>

			  <div className="form-group">
			    <label for="">What made you register today?</label>
				<select className="form-control" name="register_reason">
				  <option value="SBS">Suggested by supervisor </option>
				  <option value="DWF">Discussion with friends</option>
				  <option value="SMP">Social media post</option>
				</select>
			  </div>

			  <div className="form-group">
			    <label for="">Have you cared for a patient diagnosed by lab testing with COVID-19?</label>
				<select className="form-control" name="cared_for_covid">
				  <option value="True">Yes</option>
				  <option value="False">No</option>
				</select>
			  </div>

			  <div className="form-group">
			    <label for="">Have you cared for a patient possible COVID-19 symptoms?</label>
				<select className="form-control" name="cared_for_covid_possible">
				  <option value="True">Yes</option>
				  <option value="False">No</option>
				</select>
			  </div>

			  <div className="form-group">
			    <label for="">Please answer the question: I am confident managing patients with COVID-19?</label>
				<select className="form-control" name="confident_covid_care">
				  <option value="SA">Strongly Agree</option>
				  <option value="A">Agree</option>
				  <option value="N">Neither Agree nor Disagree</option>
				  <option value="D">Disagree</option>
				  <option value="SD">Strongly Disagree</option>
				</select>
			  </div>

			  <div className="form-group">
			    <label for="">Please answer the question: I have access to enough personal protective equipment to care for patients with COVID-19?</label>
				<select className="form-control" name="ppe_access">
				  <option value="SA">Strongly Agree</option>
				  <option value="A">Agree</option>
				  <option value="N">Neither Agree nor Disagree</option>
				  <option value="D">Disagree</option>
				  <option value="SD">Strongly Disagree</option>
				</select>
			  </div>

          </ModalBody>
          <ModalFooter>
           	<Button type="submit" color="success">Submit Information</Button>{' '}
          </ModalFooter>
          </form>
        </Modal>
      </div>
    );
  }
}