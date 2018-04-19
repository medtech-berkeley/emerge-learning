import React from "react"
import {Card, CardBody, CardHeader, CardFooter, Container} from "reactstrap";
import PropTypes from "prop-types"

export class CategoryCard extends React.Component {
	render() {
		return (
			<div className="col-sm-4">
				<Card>
				    <div className="card-body">
				      <h4 className="card-title">{this.props.name}</h4>
				      <p className="card-text">Speak up</p>
				      <a href="#" className="card-link">Card link</a>
				      <a href="#" className="card-link">Another link</a>
				    </div>
				</Card>
			</div>
		);
	}
}

CategoryCard.propTypes = {
    jobs: PropTypes.array
};
