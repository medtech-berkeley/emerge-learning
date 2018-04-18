import React from "react"
import {Card, CardBody, CardHeader, CardFooter, Container} from "reactstrap";
import PropTypes from "prop-types"

export class CategoryCard extends React.Component {
	render() {
		return (
			<div class="col-sm-4">
				<Card>
				    <div class="card-body">
				      <h4 class="card-title">{this.props.name}</h4>
				      <p class="card-text">Speak up</p>
				      <a href="#" class="card-link">Card link</a>
				      <a href="#" class="card-link">Another link</a>
				    </div>
				</Card>
			</div>
		);
	}
}

CategoryCard.propTypes = {
    jobs: PropTypes.array
};