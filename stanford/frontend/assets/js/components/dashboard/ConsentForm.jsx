import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Planet} from 'react-kawaii';

export class ConsentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <div>
        <Button color="primary" onClick={this.toggle}>Consent</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader>
          	Informed Consent Waiver

          	<div className="floating" 
          		 style=
          		 {
          			{"display": "inline-block", "margin-right": "20px", "position": "absolute", "top": "1rem", "right": "2.5rem"}
          		 }>
				<Planet size={30} mood="happy" color="#70D7A3"/>
			</div>

          </ModalHeader>
          <ModalBody>

          	<p>
			Dear Medical Professionals,
			</p> 

			<p>
			Thank you for participating in this project. 
			As part of registering for this game and competing for weekly quizzes, you agree to allow your participation and performance to be part of a research study. 
			Your contact information, registration and performance will not be available to your employers. 
			The information obtained will simply help researches evaluate the effectiveness of this game in order to improve education.
			</p> 

			<p>
			<b>RISKS AND BENEFITS: </b> There are no risks to participate in this study. 
			The benefit of participating in this study is that you will learn important concepts of emergency care through examination questions, and compete for prizes. 
			Your responses are confidential. Your decision whether or not to participate in this study will not affect your employment. 
			We cannot and do not guarantee or promise that you will receive any benefits from this study.
			</p>

			<p>
			<b>PARTICIPANT’S RIGHTS: </b>
			If you have read this form and have decided to participate in this project, please understand your participation is voluntary and you have the right to withdraw your consent or discontinue participation at any time without penalty or loss of benefits to which you are otherwise entitled. 
			The alternative is not to participate. You have the right to refuse to answer particular questions. 
			The results of this research study may be presented at scientific or professional meetings or published in scientific journals.  
			</p>

			<p>
			<b>CONTACT INFORMATION: </b> 
			Questions:  If you have any questions, concerns or complaints about this research, its procedures, risks and benefits, contact the Protocol Director, Benjamin Lindquist, MD, blindqu1@stanford.edu.
			</p>

			<p>
			<b>CONSENT: </b>
			By clicking the "I Consent" button in this box, you agree to participate in this study and attest that you have read and understand the above information. 

			</p>

			<p>
			<b>INDEPENDENT CONTACT: </b>  If you are not satisfied with how this study is being conducted, 
			or if you have any concerns, complaints, or general questions about the research or your rights as a participant, 
			please contact the Stanford Institutional Review Board (IRB) to speak to someone independent of the research team at 650-723-5244. 
			You can also write to the Stanford IRB, Stanford University, 3000 El Camino Real, Five Palo Alto Square, 4th Floor, Palo Alto, CA 94306.
			</p>

          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>I am not a study participant</Button>
            <Button color="success" onClick={this.toggle}>I consent</Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}