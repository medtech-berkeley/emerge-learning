import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Planet} from 'react-kawaii';

export class ContestRules extends React.Component {
  constructor(props) {
    super(props);
}


  render() {

    return (
        <div>
        <Modal isOpen={this.props.isOpen}>
        <ModalHeader>
          	Terms and Conditions

          	<div className="floating"
          		 style=
          		 {
          			{"display": "inline-block", "marginRight": "20px", "position": "absolute", "top": "1rem", "right": "1rem"}
          		 }>
				<Planet size={30} mood="blissful" color="#83D1FB"/>
			</div>

          </ModalHeader>
          <ModalBody>

                <p>
                    <b>Contest Rules: </b> 
                    We reserve the right to withhold prizes at the discretion of Emerge Learning. The eligible overall top challenge scorer at the end of the COVID-19 course (final challenge on May 5, 2020), will receive a prize (ties broken by completion time). Additionally, the eligible top participant based on total questions completed in challenge and practice combined will also receive a prize.
                </p>
                <p>
                    <b>Eligibility and Limitations: </b>
                    The prizes are only open to those who sign up for the game on emergelearning.org and are a prehospital or frontline provider (e.g. EMT, paramedic, community health worker, etc). Limit of one entry per person. Only one (1) prize per household for the contest. Limit of 1 entrant per email sent/received. There is no limitation on age.    
                </p> 
                <p>
                    <b>Prize(s): </b>
                    Winners will receive a tablet worth approximately $200 USD. The prize(s) that may be awarded to the eligible winner(s) are not transferable, redeemable for cash or exchangeable for any other prize. Participants must provide valid and accurate contact information. If a winner cannot be contacted or is disqualified for any reason, Emerge Learning reserves the right to determine an alternate winner or not to award that winner’s prize, in its sole discretion. 
                </p>
                <p>
                    <b>Entries: </b>
                    Only entries submitted at the website designated by Emerge Learning with forms provided by Emerge Learning may be used to enter the contest. Winner will be selected at random from all eligible entries received. All blanks must be filled in accurately or entry may be considered ineligible. 
                </p>
                <p>
                    <b>Tax: </b>
                    Any valuation of the prize(s) stated above is based on available information provided to Emerge Learning, and the value of any prize awarded to a winner may be reported for tax purposes as required by law. Each winner is solely responsible for reporting and paying any and all applicable taxes related to the prize(s) and paying any expenses associated with any prize which is not specifically provided for in the official rules.
                </p>
                <p>
                    <b>Disqualification; Fraud: </b>
                     Failure to comply with any published contest rules is grounds for immediate disqualification from the contest. Emerge Learning reserves the right to disqualify any entry not conforming to the rules of the promotion at any time. Emerge Learning assume no responsibility for entry fraud committed by any entrant. In the event it is determined that an ineligible entrant wins a prize, Emerge Learning reserves all rights to the ownership and return of the prize and all costs associated with remedying any prize award to an ineligible entry or entrant
                </p>

                <p>
                    <b>Misinformation: </b> 
                    Emerge Learning is not responsible for undeliverable, lost, delayed, misdirected or misaddressed email or any other issues regarding the electronic delivery of the contest form. This includes, but is not limited to, the speed at which your email service routes email through the internet. The sole determiner of eligibility for the final drawing will be the time the email or entry form is received at our offices.
                </p>
                
                
                <p>
                    <b>Release: </b>
                    By participating in the contest, each participant and winner waives any and all claims of liability against Emerge Learning, its employees and agents, the contest’s sponsors and their respective employees and agents, for any personal injury or loss which may occur from the conduct of, or participation in, the contest, or from the use of any prize. In order to receive a prize, participants must sign an official waiver form provided by Emerge Learning.
                </p>

                <p>
                    <b>Conduct and Decisions: </b> 
                    By participating in the contest, participants agree to be bound by the decisions of Company personnel. Persons who violate any rule, gain unfair advantage in participating in the contest, or obtain winner status using fraudulent means will be disqualified. Unsportsmanlike, disruptive, annoying, harassing or threatening behavior is prohibited. Emerge Learning will interpret these rules and resolve any disputes, conflicting claims or ambiguities concerning the rules or the contest and Emerge Learning’s decisions concerning such disputes shall be final. If the conduct or outcome of the contest is affected by human error, any mechanical malfunctions or failures of any kind, intentional interference or any event beyond the control of Emerge Learning, Emerge Learning reserves the right to terminate this contest, or make such other decisions regarding the outcome as Emerge Learning deems appropriate. All decisions will be made by Emerge Learning and are final. Emerge Learning may waive any of these rules in its sole discretion. Any attempt by an entrant or any other individual to deliberately circumvent, disrupt, damage or undermine the legitimate operation of this contest is a violation of criminal and civil laws. Should such an attempt be made, Emerge Learning reserves the right to seek civil and/or criminal prosecution and/or damages from any such person to the fullest extent permitted by law. 
                </p>

                <p>
                    <b>Miscellaneous: </b> 
                    Void where prohibited. Odds of winning depend upon the number of participants. Each winner must submit proof of eligibility and sign Emerge Learnings release form to claim the prize. Emerge Learning may substitute prizes, amend the rules or discontinue the contest at any time as announced. Emerge Learning disclaims any responsibility to notify participants of any aspect related to the conduct of the contest. All entries become the property of Emerge Learning and will not be returned. 
                </p>
                

          </ModalBody>
          <ModalFooter>
          <Button variant="primary" onClick={this.props.toggleContestRules}>
            Close
          </Button>
          </ModalFooter>
        </Modal>
        </div>
    );
  }
}