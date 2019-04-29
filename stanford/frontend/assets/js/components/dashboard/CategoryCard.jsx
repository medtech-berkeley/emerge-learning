import React from "react"
import {Row, Col, Card, CardText, CardTitle, CardBody, CardHeader, CardFooter, Container, Button} from "reactstrap";
import PropTypes from "prop-types"
import {Link} from "react-router-dom";

export class CategoryCard extends React.Component {
	getClasses() {
		let classes = "category";
		if(this.props.is_completed && !this.props.can_retake) {
			classes += " card-complete";
		} 
		return classes;
	}

	getButtonText() {
		if (this.props.is_completed && !this.props.can_retake) {
			return "Review";
		} else if (this.props.num_required_quizzes > 0 && !this.props.required) {
			return "Locked"
		} else if (this.props.is_challenge) {
			return "Start Challenge";
		} else {
			return "Start Practice";
		}
	}

	getButton() {
		if (this.props.num_required_quizzes == 0 || this.props.required) {
			return (
				<Link 
	        		to={"/dashboard/quiz/" + this.props.id} 
	        		className="btn btn-outline-success" 
	        		onClick={() => this.props.selectCategory(this.props.id)}>
					<div>{this.getButtonText()}</div>
	        	</Link>
			)
		} else {
			return (
				<div className="btn btn-outline-secondary">
					<div>{this.getButtonText()}</div>
	        	</div>
			)
		}
	}

	render() {
		return (
			<Col sm={4} className={this.getClasses()}>
				<Card className="card-shadow">
			        <Row noGutters={true}>
			            <div className="category-img col-auto">
			                <img width="64" height="64" src={this.props.image} className="img-fluid" alt={this.props.name}/>
			            </div>
			            <Col>
			                <CardBody>
			                    <CardTitle>
			                    	{this.props.name}
			                    	{this.props.is_challenge && 
			                    	<img src="https://i.imgur.com/NWR88o8.png" className="icon img-fluid" alt=""/>}
			                    </CardTitle>
			                    <CardText className="section-text">{this.props.sponsor}</CardText>
			                    <Row className="buttons">
			                        {this.getButton()}
									<a href="#" className="btn btn-outline-primary">Info</a>
			                   	</Row>
			                </CardBody>
			            </Col>
			        </Row>
			  	</Card>
			</Col>
		);
	}
}

CategoryCard.propTypes = {
    jobs: PropTypes.array
};