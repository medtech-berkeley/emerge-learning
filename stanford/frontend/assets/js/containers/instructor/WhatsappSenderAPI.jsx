import { connect } from 'react-redux'
import { WhatsappSender } from '../../components/instructor/WhatsappSender';
import { getInstructorCourses} from '../../actions/Actions';

const mapStateToProps = state => {
    let courses = state.api.instructor_courses ? state.api.instructor_courses : [];
    return {instructor_courses: courses};
};

const mapDispatchToProps = (dispatch) => {
    return {
        refreshInstructorCourses: () => dispatch(getInstructorCourses())
    };
};

let WhatsappSenderAPI = connect(mapStateToProps, mapDispatchToProps)(WhatsappSender);

export default WhatsappSenderAPI;