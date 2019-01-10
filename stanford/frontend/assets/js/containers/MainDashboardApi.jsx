import { connect } from 'react-redux'
import { MainDashboard } from '../components/MainDashboard'
import { getCategories, selectCategory, getLeaderboard } from '../actions/Actions'

const mapStateToProps = state => {
	let leaderboardResultSorted = state.api.leaderboardResult.sort(function(a, b) {
    	return parseFloat(b.score) - parseFloat(a.score);
	});

    return {categories: state.api.categories, students: state.api.students, leaderboardResult: leaderboardResultSorted};
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