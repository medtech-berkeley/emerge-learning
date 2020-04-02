import { connect } from 'react-redux'
import { CourseSection } from '../components/dashboard/CourseSection'
import { getCategories, selectCategory, getPracticeLeaderboard, getQuizLeaderboard, getCourses} from '../actions/Actions'
import { getWeeklyLeaderboard, getPreviousLeaderboard } from "../actions/Actions"
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
		refreshCourses: () => dispatch(getCourses()),
    	getCategories: (course) => dispatch(getCategories(course)),
    	selectCategory: (categoryId) => dispatch(selectCategory(categoryId)),
    	getPracticeLeaderboard: (course) => dispatch(getPracticeLeaderboard(course)),
		getQuizLeaderboard: (course) => dispatch(getQuizLeaderboard(course)),
		getWeeklyLeaderboard: (course) => dispatch(getWeeklyLeaderboard(course)),
		getPreviousLeaderboard: (course) => dispatch(getPreviousLeaderboard(course)),
		refreshStudent: () => dispatch(refreshStudent()),
    };
};

let CourseSectionApi = connect(mapStateToProps, mapDispatchToProps)(CourseSection);

export default CourseSectionApi;