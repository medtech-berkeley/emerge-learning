import React from "react";
import PropTypes from "prop-types"
import {Container} from "reactstrap";
import {Planet, Cat} from 'react-kawaii';



export class ComingSoon extends React.Component {
	render() {
		return (
		    <div>
                <Container id="comingSoon">
                    <div className="floating" 
                         style= 
                         {
                         {"display": "inline-block", "marginRight": "2rem"}
                         }>
                    <Planet size={80} mood="excited" color="#70D7A3" style={{"marginRight": "2rem"}}/>
                    </div> 
                    <h2>Launching soon. Check your email for updates!</h2>
            </Container>
            </div>
		);
	}
}

ComingSoon.propTypes = {
    api: PropTypes.array
};