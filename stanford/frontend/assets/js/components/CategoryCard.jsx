import React from "react"
import {Card, CardBody, CardHeader, CardFooter, Container, Button} from "reactstrap";
import PropTypes from "prop-types"
import {Link} from "react-router-dom";

export class CategoryCard extends React.Component {
	render() {
		return (
			<div className="col-sm-4">
				<div className="card">
			        <div className="card-body row">
			            <div className="col-auto">
			               <img src={this.props.img_src} className="img-fluid" alt=""/>
			            </div>
			                <div className="card-block px-2">
			                    <h6 className="card-title">
			                    	{this.props.name}
			                    	{this.props.is_challenge && 
			                    	<img src="https://i.imgur.com/NWR88o8.png" className="icon img-fluid" alt=""/>}
			                    </h6>
			                    <p className="card-text">{
			                    	this.props.num_questions + ' questions. ' +
			                    	this.props.time_limit + ' minutes.'}
			                    </p>
			                    <div className="row">
			                    	<Link to={"/quiz/" + this.props.id} className="btn btn-outline-success">Start Challenge</Link>
			                   		<a href="#" className="btn btn-outline-primary">Info</a>
			                   	</div>
			                </div>
			        </div>
		  		</div>
			</div>
		);
	}
}

CategoryCard.propTypes = {
    jobs: PropTypes.array
};