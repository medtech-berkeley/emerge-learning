import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';
import {Planet} from 'react-kawaii';

export class DemographicSurvey extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit= this.handleSubmit.bind(this);

    this.state = {
      modal: this.props.demographic_survey_required
    };


    this.toggle = this.toggle.bind(this);
  }

  handleSubmit(event) {
  	event.preventDefault();
    this.props.submitDemographicSurvey(event.target);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <div>
{/*      	{console.log(this.state.modal)}
*/}        <Modal isOpen={this.props.demographic_survey_required} className={this.props.className}>
        <form onSubmit={this.handleSubmit}>

          <ModalHeader>
          	Demographic Survey

          	<div className="floating" 
          		 style=
          		 {
          			{"display": "inline-block", "margin-right": "20px", "position": "absolute", "top": "1rem", "right": "1rem"}
          		 }>
				<Planet size={30} mood="excited" color="#70D7A3"/>
			</div>

          </ModalHeader>
          <ModalBody>

          <p class="form-text">
          Thank you for participating in this game. Your answers are confidential. 
          Before starting the game to compete for prizes, we request that you complete this brief survey and entrance exam. 
          Your participation is completely voluntary. Your scores will not be used for job retention and they will not be available to your employer. 
          Please only sign up as one player. If you sign up as multiple players, your responses may be voided and your account access revoked.
          </p>

          <br />
              <div class="form-group">
			    <label for="birth_year">What year were you born in?</label>
			    <input type="number" step="1" class="form-control" name="birth_year" id="birth_year" aria-describedby="inputAge"/>
			  </div>

			  <div class="form-group">
			    <label for="">Gender</label>
				<select class="form-control" name="gender">
				  <option value="F">Female</option>
				  <option value="M">Male</option>
				  <option value="O">Other</option>
				</select>			  
			  </div>

			  <div class="form-group">
			    <label for="">Job</label>
				<select class="form-control" name="job">
				  <option value="F">EMT B</option>
				  <option value="M">EMT A</option>
				  <option value="O">Paramedic</option>
				  <option value="O">Physician</option>
				</select>			  
			  </div>

			  <div class="form-group">
			    <label for="">Education</label>
				<select class="form-control" name="education_level">
				  <option value="F">Lower Primary School</option>
				  <option value="M">Upper Primary School</option>
				  <option value="O">Grade 10 (or equivalent)</option>
				  <option value="O">HSCE or grade 12</option>
				  <option value="O">University Degree (BSc or equivalent)</option>
				  <option value="O">Post-Graduate Degree (MSc/MA, etc.)</option>
				</select>			  
			  </div>

			  <div class="form-group">
			    <label for="">Country</label>
				<select class="form-control" name="country">
					<option value="IN">India</option>
					<option value="US">United States</option>
					<option value="NP">Nepal</option>
					<option value="LK">Sri Lanka</option>
					<option value="PK">Pakistan</option>
					<option value="BD">Bangladesh</option>
					<option value="MM">Myanmar</option>
					<option value="AF">Afghanistan</option>
					<option value="AX">Åland Islands</option>
					<option value="AL">Albania</option>
					<option value="DZ">Algeria</option>
					<option value="AS">American Samoa</option>
					<option value="AD">Andorra</option>
					<option value="AO">Angola</option>
					<option value="AI">Anguilla</option>
					<option value="AQ">Antarctica</option>
					<option value="AG">Antigua and Barbuda</option>
					<option value="AR">Argentina</option>
					<option value="AM">Armenia</option>
					<option value="AW">Aruba</option>
					<option value="AU">Australia</option>
					<option value="AT">Austria</option>
					<option value="AZ">Azerbaijan</option>
					<option value="BS">Bahamas</option>
					<option value="BH">Bahrain</option>
					<option value="BB">Barbados</option>
					<option value="BY">Belarus</option>
					<option value="BE">Belgium</option>
					<option value="BZ">Belize</option>
					<option value="BJ">Benin</option>
					<option value="BM">Bermuda</option>
					<option value="BT">Bhutan</option>
					<option value="BO">Bolivia, Plurinational State of</option>
					<option value="BQ">Bonaire, Sint Eustatius and Saba</option>
					<option value="BA">Bosnia and Herzegovina</option>
					<option value="BW">Botswana</option>
					<option value="BV">Bouvet Island</option>
					<option value="BR">Brazil</option>
					<option value="IO">British Indian Ocean Territory</option>
					<option value="BN">Brunei Darussalam</option>
					<option value="BG">Bulgaria</option>
					<option value="BF">Burkina Faso</option>
					<option value="BI">Burundi</option>
					<option value="KH">Cambodia</option>
					<option value="CM">Cameroon</option>
					<option value="CA">Canada</option>
					<option value="CV">Cape Verde</option>
					<option value="KY">Cayman Islands</option>
					<option value="CF">Central African Republic</option>
					<option value="TD">Chad</option>
					<option value="CL">Chile</option>
					<option value="CN">China</option>
					<option value="CX">Christmas Island</option>
					<option value="CC">Cocos (Keeling) Islands</option>
					<option value="CO">Colombia</option>
					<option value="KM">Comoros</option>
					<option value="CG">Congo</option>
					<option value="CD">Congo, the Democratic Republic of the</option>
					<option value="CK">Cook Islands</option>
					<option value="CR">Costa Rica</option>
					<option value="CI">Côte d'Ivoire</option>
					<option value="HR">Croatia</option>
					<option value="CU">Cuba</option>
					<option value="CW">Curaçao</option>
					<option value="CY">Cyprus</option>
					<option value="CZ">Czech Republic</option>
					<option value="DK">Denmark</option>
					<option value="DJ">Djibouti</option>
					<option value="DM">Dominica</option>
					<option value="DO">Dominican Republic</option>
					<option value="EC">Ecuador</option>
					<option value="EG">Egypt</option>
					<option value="SV">El Salvador</option>
					<option value="GQ">Equatorial Guinea</option>
					<option value="ER">Eritrea</option>
					<option value="EE">Estonia</option>
					<option value="ET">Ethiopia</option>
					<option value="FK">Falkland Islands (Malvinas)</option>
					<option value="FO">Faroe Islands</option>
					<option value="FJ">Fiji</option>
					<option value="FI">Finland</option>
					<option value="FR">France</option>
					<option value="GF">French Guiana</option>
					<option value="PF">French Polynesia</option>
					<option value="TF">French Southern Territories</option>
					<option value="GA">Gabon</option>
					<option value="GM">Gambia</option>
					<option value="GE">Georgia</option>
					<option value="DE">Germany</option>
					<option value="GH">Ghana</option>
					<option value="GI">Gibraltar</option>
					<option value="GR">Greece</option>
					<option value="GL">Greenland</option>
					<option value="GD">Grenada</option>
					<option value="GP">Guadeloupe</option>
					<option value="GU">Guam</option>
					<option value="GT">Guatemala</option>
					<option value="GG">Guernsey</option>
					<option value="GN">Guinea</option>
					<option value="GW">Guinea-Bissau</option>
					<option value="GY">Guyana</option>
					<option value="HT">Haiti</option>
					<option value="HM">Heard Island and McDonald Islands</option>
					<option value="VA">Holy See (Vatican City State)</option>
					<option value="HN">Honduras</option>
					<option value="HK">Hong Kong</option>
					<option value="HU">Hungary</option>
					<option value="IS">Iceland</option>
					<option value="ID">Indonesia</option>
					<option value="IR">Iran, Islamic Republic of</option>
					<option value="IQ">Iraq</option>
					<option value="IE">Ireland</option>
					<option value="IM">Isle of Man</option>
					<option value="IL">Israel</option>
					<option value="IT">Italy</option>
					<option value="JM">Jamaica</option>
					<option value="JP">Japan</option>
					<option value="JE">Jersey</option>
					<option value="JO">Jordan</option>
					<option value="KZ">Kazakhstan</option>
					<option value="KE">Kenya</option>
					<option value="KI">Kiribati</option>
					<option value="KP">Korea, Democratic People's Republic of</option>
					<option value="KR">Korea, Republic of</option>
					<option value="KW">Kuwait</option>
					<option value="KG">Kyrgyzstan</option>
					<option value="LA">Lao People's Democratic Republic</option>
					<option value="LV">Latvia</option>
					<option value="LB">Lebanon</option>
					<option value="LS">Lesotho</option>
					<option value="LR">Liberia</option>
					<option value="LY">Libya</option>
					<option value="LI">Liechtenstein</option>
					<option value="LT">Lithuania</option>
					<option value="LU">Luxembourg</option>
					<option value="MO">Macao</option>
					<option value="MK">Macedonia, the former Yugoslav Republic of</option>
					<option value="MG">Madagascar</option>
					<option value="MW">Malawi</option>
					<option value="MY">Malaysia</option>
					<option value="MV">Maldives</option>
					<option value="ML">Mali</option>
					<option value="MT">Malta</option>
					<option value="MH">Marshall Islands</option>
					<option value="MQ">Martinique</option>
					<option value="MR">Mauritania</option>
					<option value="MU">Mauritius</option>
					<option value="YT">Mayotte</option>
					<option value="MX">Mexico</option>
					<option value="FM">Micronesia, Federated States of</option>
					<option value="MD">Moldova, Republic of</option>
					<option value="MC">Monaco</option>
					<option value="MN">Mongolia</option>
					<option value="ME">Montenegro</option>
					<option value="MS">Montserrat</option>
					<option value="MA">Morocco</option>
					<option value="MZ">Mozambique</option>
					<option value="NA">Namibia</option>
					<option value="NR">Nauru</option>
					<option value="NL">Netherlands</option>
					<option value="NC">New Caledonia</option>
					<option value="NZ">New Zealand</option>
					<option value="NI">Nicaragua</option>
					<option value="NE">Niger</option>
					<option value="NG">Nigeria</option>
					<option value="NU">Niue</option>
					<option value="NF">Norfolk Island</option>
					<option value="MP">Northern Mariana Islands</option>
					<option value="NO">Norway</option>
					<option value="OM">Oman</option>
					<option value="PW">Palau</option>
					<option value="PS">Palestinian Territory, Occupied</option>
					<option value="PA">Panama</option>
					<option value="PG">Papua New Guinea</option>
					<option value="PY">Paraguay</option>
					<option value="PE">Peru</option>
					<option value="PH">Philippines</option>
					<option value="PN">Pitcairn</option>
					<option value="PL">Poland</option>
					<option value="PT">Portugal</option>
					<option value="PR">Puerto Rico</option>
					<option value="QA">Qatar</option>
					<option value="RE">Réunion</option>
					<option value="RO">Romania</option>
					<option value="RU">Russian Federation</option>
					<option value="RW">Rwanda</option>
					<option value="BL">Saint Barthélemy</option>
					<option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>
					<option value="KN">Saint Kitts and Nevis</option>
					<option value="LC">Saint Lucia</option>
					<option value="MF">Saint Martin (French part)</option>
					<option value="PM">Saint Pierre and Miquelon</option>
					<option value="VC">Saint Vincent and the Grenadines</option>
					<option value="WS">Samoa</option>
					<option value="SM">San Marino</option>
					<option value="ST">Sao Tome and Principe</option>
					<option value="SA">Saudi Arabia</option>
					<option value="SN">Senegal</option>
					<option value="RS">Serbia</option>
					<option value="SC">Seychelles</option>
					<option value="SL">Sierra Leone</option>
					<option value="SG">Singapore</option>
					<option value="SX">Sint Maarten (Dutch part)</option>
					<option value="SK">Slovakia</option>
					<option value="SI">Slovenia</option>
					<option value="SB">Solomon Islands</option>
					<option value="SO">Somalia</option>
					<option value="ZA">South Africa</option>
					<option value="GS">South Georgia and the South Sandwich Islands</option>
					<option value="SS">South Sudan</option>
					<option value="ES">Spain</option>
					<option value="SD">Sudan</option>
					<option value="SR">Suriname</option>
					<option value="SJ">Svalbard and Jan Mayen</option>
					<option value="SZ">Swaziland</option>
					<option value="SE">Sweden</option>
					<option value="CH">Switzerland</option>
					<option value="SY">Syrian Arab Republic</option>
					<option value="TW">Taiwan, Province of China</option>
					<option value="TJ">Tajikistan</option>
					<option value="TZ">Tanzania, United Republic of</option>
					<option value="TH">Thailand</option>
					<option value="TL">Timor-Leste</option>
					<option value="TG">Togo</option>
					<option value="TK">Tokelau</option>
					<option value="TO">Tonga</option>
					<option value="TT">Trinidad and Tobago</option>
					<option value="TN">Tunisia</option>
					<option value="TR">Turkey</option>
					<option value="TM">Turkmenistan</option>
					<option value="TC">Turks and Caicos Islands</option>
					<option value="TV">Tuvalu</option>
					<option value="UG">Uganda</option>
					<option value="UA">Ukraine</option>
					<option value="AE">United Arab Emirates</option>
					<option value="GB">United Kingdom</option>
					<option value="UM">United States Minor Outlying Islands</option>
					<option value="UY">Uruguay</option>
					<option value="UZ">Uzbekistan</option>
					<option value="VU">Vanuatu</option>
					<option value="VE">Venezuela, Bolivarian Republic of</option>
					<option value="VN">Viet Nam</option>
					<option value="VG">Virgin Islands, British</option>
					<option value="VI">Virgin Islands, U.S.</option>
					<option value="WF">Wallis and Futuna</option>
					<option value="EH">Western Sahara</option>
					<option value="YE">Yemen</option>
					<option value="ZM">Zambia</option>
					<option value="ZW">Zimbabwe</option>
				</select>			  
			  </div>

			  <div class="form-group">
			    <label for="">State (India Only)</label>
				<select class="form-control" name="state">
					<option value="NA">Not Applicable</option>
					<option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
					<option value="Andhra Pradesh">Andhra Pradesh</option>
					<option value="Arunachal Pradesh">Arunachal Pradesh</option>
					<option value="Assam">Assam</option>
					<option value="Bihar">Bihar</option>
					<option value="Chandigarh">Chandigarh</option>
					<option value="Chhattisgarh">Chhattisgarh</option>
					<option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
					<option value="Daman and Diu">Daman and Diu</option>
					<option value="Delhi">Delhi</option>
					<option value="Goa">Goa</option>
					<option value="Gujarat">Gujarat</option>
					<option value="Haryana">Haryana</option>
					<option value="Himachal Pradesh">Himachal Pradesh</option>
					<option value="Jammu and Kashmir">Jammu and Kashmir</option>
					<option value="Jharkhand">Jharkhand</option>
					<option value="Karnataka">Karnataka</option>
					<option value="Kerala">Kerala</option>
					<option value="Lakshadweep">Lakshadweep</option>
					<option value="Madhya Pradesh">Madhya Pradesh</option>
					<option value="Maharashtra">Maharashtra</option>
					<option value="Manipur">Manipur</option>
					<option value="Meghalaya">Meghalaya</option>
					<option value="Mizoram">Mizoram</option>
					<option value="Nagaland">Nagaland</option>
					<option value="Orissa">Orissa</option>
					<option value="Pondicherry">Pondicherry</option>
					<option value="Punjab">Punjab</option>
					<option value="Rajasthan">Rajasthan</option>
					<option value="Sikkim">Sikkim</option>
					<option value="Tamil Nadu">Tamil Nadu</option>
					<option value="Tripura">Tripura</option>
					<option value="Uttaranchal">Uttaranchal</option>
					<option value="Uttar Pradesh">Uttar Pradesh</option>
					<option value="West Bengal">West Bengal</option>
				</select>			  
			  </div>

			  <div class="form-group">
			    <label for="years_of_experience">Years of Experience</label>
			    <input type="number" step="0.25" class="form-control" name="years_of_experience" id="years_of_experience" aria-describedby="inputYOE"/>
			  </div>

			  <div class="form-group">
			    <label for="">Organization</label>
				<select class="form-control" name="organization">
				  <option value="G">GVK EMRI</option>
				  <option value="O">Other</option>
				</select>			  
			  </div>

			  <div class="form-group">
			    <label for="">Completed Medical/Cardiovascular Refresher program (GVK EMRI Only)</label>
				<select class="form-control" name="med_cardio_refresher">
				  <option value="NA">N/A</option>
				  <option value="Y">Male</option>
				  <option value="N">Other</option>
				</select>			  
			  </div>

              <div class="form-group">
				<label for="med_cardio_date">Date Completed?</label>
			    <input type="date" class="form-control" name="med_cardio_date" id="med_cardio_date" aria-describedby="inputCardioDate" placeholder="Enter Date"/>
			  </div>

			  <div class="form-group">
			    <label for="">Completed OB/GYN Refresher Program (GVK EMRI Only)</label>
				<select class="form-control" name="obgyn_refresher">
				  <option value="NA">Not Applicable</option>
				  <option value="Y">Yes</option>
				  <option value="N">No</option>
				</select>			  
			  </div>

			  <div class="form-group">
				<label for="obgyn_date">Date Completed?</label>
			    <input type="date" class="form-control" name="obgyn_date" id="obgyn_date" aria-describedby="inputPediatricsDate" placeholder="Enter Date"/>
			  </div>

			  <div class="form-group">
			    <label for="">Completed Trauma Refresher Program (GVK EMRI Only)</label>
				<select class="form-control" name="trauma_refresher">
				  <option value="NA">Not Applicable</option>
				  <option value="Y">Yes</option>
				  <option value="N">No</option>
				</select>			  
			  </div>

			  <div class="form-group">
				<label for="inputDatePedatrics">Date Completed?</label>
			    <input type="date" class="form-control" name="trauma_date" id="trauma_date" aria-describedby="inputTraumaDate" placeholder="Enter Date"/>
			  </div>

			  <div class="form-group">
			    <label for="">Completed Pediatrics Refresher Program (GVK EMRI Only)</label>
				<select class="form-control" name="pediatrics_refresher">
				  <option value="NA">Not Applicable</option>
				  <option value="Y">Yes</option>
				  <option value="N">No</option>
				</select>			  
			  </div>

			  <div class="form-group">
				<label for="inputDatePedatrics">Date Completed?</label>
			    <input type="date" class="form-control" name="pediatrics_date" id="pediatrics_date" aria-describedby="inputPediatricsDate" placeholder="Enter Date"/>
			  </div>

			  <div class="form-group">
			    <label for="">Completed Leadership/Communication Refresher Program (GVK EMRI Only)</label>
				<select class="form-control" name="leadership_refresher">
				  <option value="NA">Not Applicable</option>
				  <option value="Y">Yes</option>
				  <option value="N">No</option>
				</select>			  
			  </div>

			  <div class="form-group">
				<label for="inputDatePedatrics">Date Completed?</label>
			    <input type="date" class="form-control" name="leadership_date" id="leadership_date" aria-describedby="inputLeadershipDate" placeholder="Enter Date"/>
			  </div>

			  <div class="form-group">
			    <label for="">What device do you use most often to access the internet?</label>
				<select class="form-control" name="most_used_device">
				  <option value="C">Computer</option>
				  <option value="T">Tablet</option>
				  <option value="S">Smartphone</option>
				</select>			  
			  </div>

			  <div class="form-group">
			    <label for="">Please rate the quality of your internet access</label>
				<select class="form-control" name="internet_reliability">
				  <option value="P">Poor/Unreliable</option>
				  <option value="A">Adequate</option>
				  <option value="E">Excellent</option>
				</select>
			  </div>

			  <div class="form-group">
			    <label for="work_device_hours">How many hours/day do you use your phone or computer for work purposes?</label>
			    <input type="number" step="0.25" class="form-control" name="work_device_hours" id="work_device_hours" aria-describedby="work_device_hours"/>
			  </div>

			  <div class="form-group">
			    <label for="personal_device_hours">How many hours/day do you use your phone or computer for personal purposes?</label>
			    <input type="number" step="0.25" class="form-control" name="personal_device_hours" id="personal_device_hours" aria-describedby="personal_device_hours"/>
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