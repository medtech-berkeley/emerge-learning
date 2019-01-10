import React from "react"
import {Card, CardBody, CardHeader, CardFooter, Container, Button} from "reactstrap";
import PropTypes from "prop-types"
import {Link} from "react-router-dom";

export class CategoryCard extends React.Component {
	render() {
		return (
			<div className={"col-sm-4" + (this.props.is_completed ? " card-complete" : "")}>
				<div className="card card-shadow">
			        <div className="row no-gutters">
			            <div className="category-img col-auto">
			                <img width="64" height="64" src={this.props.image} className="img-fluid" alt={this.props.name}/>
			            </div>
			            <div className="col">
			                <div className="card-body">
			                    <h4 className="card-title">
			                    	{this.props.name}
			                    	{this.props.is_challenge && 
			                    	<img src="https://i.imgur.com/NWR88o8.png" className="icon img-fluid" alt=""/>}
			                    </h4>
			                    <p className="card-text section-text">{this.props.sponsor}</p>
			                    <div className="row">
			                    	<Link 
			                    		to={"/dashboard/quiz/" + this.props.id} 
			                    		className="btn btn-outline-success" 
			                    		onClick={() => this.props.selectCategory(this.props.id)}>
										{this.props.is_completed ? <div className="">Review Answers</div> :
											((this.props.is_challenge && <div>Start Challenge</div>) || <div>Start Practice</div>)
										}
			                    	</Link>
									<a href="#" className="btn btn-outline-primary">Info</a>
			                   	</div>
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