	import React from "react"
import {Card, CardBody, CardHeader, CardFooter, Container, Row} from "reactstrap";
import {CategoryCard} from "./CategoryCard"
import PropTypes from "prop-types"

export class CategoriesBox extends React.Component {
	render() {
		return (
			<Container>
				<Row>
					{this.props.categories.map((category) => <CategoryCard key={category.name} {...category} />)}
				</Row>
			</Container>
		);
	}
}

CategoriesBox.propTypes = {
    categories: PropTypes.array
};