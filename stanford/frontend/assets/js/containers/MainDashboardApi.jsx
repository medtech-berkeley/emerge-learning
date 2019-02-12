import { connect } from 'react-redux'
import { MainDashboard } from '../components/dashboard/MainDashboard'
import { getCategories, selectCategory, getLeaderboard, submitConsentForm, submitDemographicSurvey } from '../actions/Actions'
import { refreshStudent } from '../actions/LoadUserActions'

const mapStateToProps = state => {
    return {categories: state.api.categories, students: state.api.students, leaderboardResult: state.api.leaderboardResult, user: state.api.user};
};

const mapDispatchToProps = dispatch => {
    return {
    	getCategories: () => dispatch(getCategories()),
    	selectCategory: (categoryId) => dispatch(selectCategory(categoryId)),
    	getLeaderboard: () => dispatch(getLeaderboard()),
    	submitConsentForm: (consent) => dispatch(submitConsentForm(consent)),
        submitDemographicSurvey: (ref) => dispatch(submitDemographicSurvey(ref)),
        refreshStudent: () => dispatch(refreshStudent()),
    };
};

let MainDashboardApi = connect(mapStateToProps, mapDispatchToProps)(MainDashboard);

export default MainDashboardApi;