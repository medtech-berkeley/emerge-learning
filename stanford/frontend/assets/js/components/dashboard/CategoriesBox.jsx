import React from "react"
import {Card, CardBody, CardHeader, CardFooter, Container, Row} from "reactstrap";
import {CategoryCard} from "./CategoryCard"
import PropTypes from "prop-types"
import { SuppressErrorBoundary } from "../errors/SuppressErrorBoundary";

export class CategoriesBox extends React.Component {
	constructor(props) {
		super(props);
		this.getCategoryList = this.getCategoryList.bind(this);
	  }

	getCategoryList() {
		if (!Array.isArray(this.props.categories)) {
			return [];
		}
		return this.props.categories;
	}

	render() {
		return (
			<div className="categoriesBox">
			<SuppressErrorBoundary>
				<Container>
					<Row>
						{
							this.getCategoryList().map((category) => {
								if(this.props.is_challenge_section === category.is_challenge) {
									return <CategoryCard num_required_quizzes={this.props.num_required_quizzes} selectCategory={this.props.selectCategory} key={category.id} {...category} />
								}
							})
						}
					</Row>
				</Container>
			</SuppressErrorBoundary>
			</div>
		);
	}
}

CategoriesBox.propTypes = {
    categories: PropTypes.array
};