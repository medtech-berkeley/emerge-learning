import { connect } from 'react-redux'
import { MainDashboard } from '../components/MainDashboard'
import { getCategories, selectCategory } from '../actions/Actions'
import { refreshStudents } from '../actions/LoadUserActions'

const mapStateToProps = state => {
    return {categories: state.api.categories, students: state.api.students};
};

const mapDispatchToProps = dispatch => {
    return {
    	getCategories: () => dispatch(getCategories()),
    	selectCategory: (categoryId) => dispatch(selectCategory(categoryId)),
    	refreshStudents: () => dispatch(refreshStudents())
    };
};

let MainDashboardApi = connect(mapStateToProps, mapDispatchToProps)(MainDashboard);

export default MainDashboardApi;