import React from "react"
import {Row, Col, Card, CardText, CardTitle, CardBody, CardHeader, CardFooter, Container, Button} from "reactstrap";
import PropTypes from "prop-types"
import {Link} from "react-router-dom";

export class CategoryCard extends React.Component {
	render() {
		return (
			<Col sm={4} className={this.props.is_completed ? "category card-complete" : "category"}>
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
			                    	<Link 
			                    		to={"/dashboard/quiz/" + this.props.id} 
			                    		className="btn btn-outline-success" 
			                    		onClick={() => this.props.selectCategory(this.props.id)}>
										{this.props.is_completed ? <div className="">Review Answers</div> :
											((this.props.is_challenge && <div>Start Challenge</div>) || <div>Start Practice</div>)
										}
			                    	</Link>
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