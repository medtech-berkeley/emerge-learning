import React from "react"
import {Card, CardBody, CardHeader, CardFooter, Container, Row} from "reactstrap";
import {CategoryCard} from "./CategoryCard"
import PropTypes from "prop-types"
import { ErrorBoundary } from "../errors/ErrorBoundary";

export class CategoriesBox extends React.Component {
	render() {
		return (
			<div className="categoriesBox">
			<ErrorBoundary>
				<Container>
					<Row>
						{this.props.categories.map((category) => (this.props.is_challenge_section === category.is_challenge) && <CategoryCard num_required_quizzes={this.props.num_required_quizzes} selectCategory={this.props.selectCategory} key={category.name} {...category} />)}
					</Row>
				</Container>
			</ErrorBoundary>
			</div>
		);
	}
}

CategoriesBox.propTypes = {
    categories: PropTypes.array
};