import { connect } from 'react-redux'
import { Instructor } from '../components/Instructor'
import { refreshStudent } from '../actions/LoadUserActions'
import { refreshData } from '../actions/DataActions'
import { getQuestionUserData } from '../actions/Actions'

const mapStateToProps = state => {
    return {user: state.api.user, questionUserData: state.api.questionUserData, data: state.api.data};
};

const mapDispatchToProps = (dispatch) => {
    return {
        refreshUser: () => dispatch(refreshStudent()),
        refreshData: () => dispatch(refreshData()),
        getQuestionUserData: () => dispatch(getQuestionUserData()),
    };
};

let InstructorContainer = connect(mapStateToProps, mapDispatchToProps)(Instructor);

export default InstructorContainer;