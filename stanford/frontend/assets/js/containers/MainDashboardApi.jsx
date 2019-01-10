import { connect } from 'react-redux'
import { MainDashboard } from '../components/dashboard/MainDashboard'
import { getCategories, selectCategory, getLeaderboard } from '../actions/Actions'

const mapStateToProps = state => {
    return {categories: state.api.categories, students: state.api.students, leaderboardResult: state.api.leaderboardResult};
};

const mapDispatchToProps = dispatch => {
    return {
    	getCategories: () => dispatch(getCategories()),
    	selectCategory: (categoryId) => dispatch(selectCategory(categoryId)),
    	getLeaderboard: () => dispatch(getLeaderboard()),
    };
};

let MainDashboardApi = connect(mapStateToProps, mapDispatchToProps)(MainDashboard);

export default MainDashboardApi;