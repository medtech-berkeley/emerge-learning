import { connect } from 'react-redux'
import { MainDashboard } from '../components/dashboard/MainDashboard'
import { getCourses, submitConsentForm, submitCovid19Survey, submitDemographicSurvey } from '../actions/Actions'
import { refreshStudent } from '../actions/LoadUserActions'

const mapStateToProps = state => {
	return {courses: state.api.courses,
			user: state.api.user};
};

const mapDispatchToProps = dispatch => {
    return {
    	refreshCourses: () => dispatch(getCourses()),
		refreshStudent: () => dispatch(refreshStudent()),
    	submitConsentForm: (consent) => dispatch(submitConsentForm(consent)),
        submitDemographicSurvey: (ref) => dispatch(submitDemographicSurvey(ref)),
        submitCovid19Survey: (ref) => dispatch(submitCovid19Survey(ref)),
    };
};

let MainDashboardApi = connect(mapStateToProps, mapDispatchToProps)(MainDashboard);

export default MainDashboardApi;