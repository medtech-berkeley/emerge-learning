import React from 'react';
import { Container } from "reactstrap";

export class QuestionComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: '',
    };
  }

  handleOptionChange = (event) => {
    this.setState({ selectedOption: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic
  };

  render() {
    return (
      <Container className="vh-100 d-flex flex-column align-items-center" style={{ backgroundColor: '#E6EEF8' }}>
        <div className="question-container" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', maxWidth: '800px', width: '100%', margin: '20px 0' }}>
          <div className="question" style={{ fontSize: '1.2em', marginBottom: '20px' }}>
            The manual maneuver recommended for removing suspected foreign body airway obstructions in a responsive adult is:
          </div>
          <div className="author" style={{ display: 'inline-block', backgroundColor: '#F3F0F0', padding: '5px 10px', borderRadius: '20px', fontSize: '0.9em', color: '#666', marginBottom: '20px' }}>
            Author
          </div>
          <div className="difficulty" style={{ display: 'inline-block', backgroundColor: '#D0C1E8', padding: '5px 10px', borderRadius: '20px', fontSize: '0.9em', color: '#666', marginBottom: '20px', marginLeft: '10px' }}>
            ● medium
          </div>
          <form onSubmit={this.handleSubmit} className="options" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
            <label style={{ flex: '1 1 calc(50% - 10px)' }}>
              <input type="radio" value="Gloves" checked={this.state.selectedOption === 'Gloves'} onChange={this.handleOptionChange} />
              Gloves
            </label>
            <label style={{ flex: '1 1 calc(50% - 10px)' }}>
              <input type="radio" value="Gloves, Mask, Goggles and Gown" checked={this.state.selectedOption === 'Gloves, Mask, Goggles and Gown'} onChange={this.handleOptionChange} />
              Gloves, Mask, Goggles and Gown
            </label>
            <label style={{ flex: '1 1 calc(50% - 10px)' }}>
              <input type="radio" value="Gloves and Gown" checked={this.state.selectedOption === 'Gloves and Gown'} onChange={this.handleOptionChange} />
              Gloves and Gown
            </label>
            <label style={{ flex: '1 1 calc(50% - 10px)' }}>
              <input type="radio" value="Gloves and Mask" checked={this.state.selectedOption === 'Gloves and Mask'} onChange={this.handleOptionChange} />
              Gloves and Mask
            </label>
            <button type="submit" className="submit-btn" style={{ display: 'block', width: '100%', padding: '10px', border: 'none', borderRadius: '5px', backgroundColor: '#3B8FC2', color: 'white', fontSize: '1em', cursor: 'pointer', marginBottom: '20px' }}>
              Submit
            </button>
          </form>
          <div className="explanation" style={{ marginBottom: '10px' }}>
            <strong>Explanation</strong>
            <div className="explanation-content" style={{ backgroundColor: '#F9F9F9', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
              COVID-19 can be transmitted by droplets and aerosolization. The appropriate PPE (personal protective equipment) includes mask, gloves, gown and eye protection. Ideally, an N95 mask or respirator should be used. This mask should always be used with performed procedures that may cause aerosolization (e.g., intubation, bag mask ventilation, nebulization, noninvasive positive pressure ventilation, etc…)
            </div>
          </div>
          <div className="references" style={{ marginBottom: '10px' }}>
            <strong>References</strong>
            <div className="references-content" style={{ backgroundColor: '#F9F9F9', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
              {/* References content here */}
            </div>
          </div>
          <div className="link" style={{ marginBottom: '10px' }}>
            <strong>Link</strong>
            <div className="link-content" style={{ backgroundColor: '#F9F9F9', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
              {/* Link content here */}
            </div>
          </div>
          <div className="reviewed-by" style={{ marginBottom: '10px' }}>
            <strong>Reviewed By</strong>
            <div className="reviewed-by-content" style={{ backgroundColor: '#F9F9F9', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
              {/* Reviewed By content here */}
            </div>
          </div>
        </div>
      </Container>
    );
  }
}