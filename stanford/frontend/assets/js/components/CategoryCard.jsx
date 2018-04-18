import React from "react"
import {Card, CardBody, CardHeader, CardFooter, Container} from "reactstrap";
import PropTypes from "prop-types"

export class CategoryCard extends React.Component {
	render() {
		return (
			<div class="col">
				<Card>
				    <div class="card-body">
				      <h4 class="card-title">Card title</h4>
				      <p class="card-text">Some example text. Some example text.</p>
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