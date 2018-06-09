import React from "react"
import {Card, CardBody, CardHeader, CardFooter, Container, Row} from "reactstrap";
import PropTypes from "prop-types"

export class QuizComplete extends React.Component {
	render() {
		return (
			<Container>
				<div class="card text-center">
				  <div class="card-header">
				  	<h3>
				    Great Work!
				    </h3>
				  </div>
				  <div class="card-body">
				    <h5 class="card-title">You have successfully completed {this.props.categoryId}.</h5>
				  </div>
				</div>
			</Container>
		);
	}
}

QuizComplete.propTypes = {
    categories: PropTypes.array
};