import React from "react"
import {Card, CardBody, CardHeader, CardFooter, Container, Row} from "reactstrap";
import {CategoryCard} from "./CategoryCard"
import PropTypes from "prop-types"
import { SuppressErrorBoundary } from "../errors/SuppressErrorBoundary";

export class CategoriesBox extends React.Component {
	render() {
		return (
			<div className="categoriesBox">
			<SuppressErrorBoundary>
				<Container>
					<Row>
						{this.props.categories.map((category) => (this.props.is_challenge_section === category.is_challenge) && <CategoryCard num_required_quizzes={this.props.num_required_quizzes} selectCategory={this.props.selectCategory} key={category.name} {...category} />)}
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