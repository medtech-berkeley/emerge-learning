import { connect } from 'react-redux'
import { MainDashboard } from '../components/MainDashboard'
import { getCategories, selectCategory } from '../actions/Actions'


const mapStateToProps = state => {
    return {categories: state.api.categories};
};

const mapDispatchToProps = dispatch => {
    return {
    	getCategories: () => dispatch(getCategories()),
    	selectCategory: (categoryId) => dispatch(selectCategory(categoryId))
    };
};

let MainDashboardApi = connect(mapStateToProps, mapDispatchToProps)(MainDashboard);

export default MainDashboardApi;