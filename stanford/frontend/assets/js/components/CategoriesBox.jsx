	import React from "react"
import {Card, CardBody, CardHeader, CardFooter, Container, Row} from "reactstrap";
import {CategoryCard} from "./CategoryCard"
import PropTypes from "prop-types"

export class CategoriesBox extends React.Component {
	render() {
		return (
			<div className="categoriesBox">
			<Container>
				<Row>
					{this.props.categories.map((category) => <CategoryCard key={category.name} {...category} />)}
				</Row>
			</Container>
			</div>
		);
	}
}

CategoriesBox.propTypes = {
    categories: PropTypes.array
};
