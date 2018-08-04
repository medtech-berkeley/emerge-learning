import { connect } from 'react-redux'
import { MainDashboard } from '../components/MainDashboard'
import { getCategories, selectCategory, getLeaderboard } from '../actions/Actions'
import { refreshStudents } from '../actions/LoadUserActions'

const mapStateToProps = state => {
	let leaderboardResultSorted = state.api.leaderboardResult.sort(function(a, b) {
    	return parseFloat(b.num_correct) - parseFloat(a.num_correct);
	});

    return {categories: state.api.categories, students: state.api.students, leaderboardResult: leaderboardResultSorted};
};

const mapDispatchToProps = dispatch => {
    return {
    	getCategories: () => dispatch(getCategories()),
    	selectCategory: (categoryId) => dispatch(selectCategory(categoryId)),
    	refreshStudents: () => dispatch(refreshStudents()),
    	getLeaderboard: () => dispatch(getLeaderboard()),
    };
};

let MainDashboardApi = connect(mapStateToProps, mapDispatchToProps)(MainDashboard);

export default MainDashboardApi;