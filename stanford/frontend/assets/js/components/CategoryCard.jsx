import React from "react"
import {Card, CardBody, CardHeader, CardFooter, Container, Button} from "reactstrap";
import PropTypes from "prop-types"

export class CategoryCard extends React.Component {
	render() {
		return (
				<div className="col-sm-4">
					<div class="card">
				        <div class="card-body row">
				            <div class="col-auto">
				               <img src={this.props.img_src} class="img-fluid" alt=""></img>	
				            </div>
				                <div class="card-block px-2">
				                    <h6 class="card-title">
				                    	{this.props.name}
				                    	{this.props.is_challenge && 
				                    	<img src="https://i.imgur.com/NWR88o8.png" class="icon img-fluid" alt=""></img>}
				                    </h6>
				                    <p class="card-text">{
				                    	this.props.num_questions + ' questions. ' +
				                    	this.props.time_limit + ' minutes.'}
				                    </p>
				                    <div class="row">
				                    	<a href="#" class="btn btn-outline-success">Start Challenge</a>
				                   		<a href="#" class="btn btn-outline-primary">Info</a>
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