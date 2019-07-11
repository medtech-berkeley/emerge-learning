import { connect } from 'react-redux'
import { MainDashboard } from '../components/dashboard/MainDashboard'
import { getCategories, selectCategory, getPracticeLeaderboard, getQuizLeaderboard} from '../actions/Actions'
import { getWeeklyLeaderboard, getPreviousLeaderboard, submitConsentForm, submitDemographicSurvey } from "../actions/Actions"
import { refreshStudent } from '../actions/LoadUserActions'

const mapStateToProps = state => {
    return {categories: state.api.categories, 
    		students: state.api.students,
    		practiceLeaderboardResult: state.api.practiceLeaderboardResult,
    		quizLeaderboardResult: state.api.quizLeaderboardResult,
    		weeklyLeaderboardResult: state.api.weeklyLeaderboardResult,
    		previousLeaderboardResult: state.api.previousLeaderboardResult,
    		user: state.api.user};
};

const mapDispatchToProps = dispatch => {
    return {
    	getCategories: () => dispatch(getCategories()),
    	selectCategory: (categoryId) => dispatch(selectCategory(categoryId)),
    	getPracticeLeaderboard: () => dispatch(getPracticeLeaderboard()),
		getQuizLeaderboard: () => dispatch(getQuizLeaderboard()),
		getWeeklyLeaderboard: () => dispatch(getWeeklyLeaderboard()),
		getPreviousLeaderboard: () => dispatch(getPreviousLeaderboard()),
    	submitConsentForm: (consent) => dispatch(submitConsentForm(consent)),
        submitDemographicSurvey: (ref) => dispatch(submitDemographicSurvey(ref)),
        refreshStudent: () => dispatch(refreshStudent()),
    };
};

let MainDashboardApi = connect(mapStateToProps, mapDispatchToProps)(MainDashboard);

export default MainDashboardApi;