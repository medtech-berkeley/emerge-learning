import { connect } from 'react-redux'
import { UserManagement } from '../../components/instructor/UserManagement';
import { refreshStudents, updateProfileType } from '../../actions/LoadUserActions';
import { addMessage, throwError } from '../../actions/UIActions';

const mapStateToProps = state => {
    let messages = state.ui.messages['userman'];

    messages = messages ? messages : [];

    return {students: state.api.students, messages};
};

const mapDispatchToProps = (dispatch) => {
    return {
        refreshStudents: () => dispatch(refreshStudents()),
        updateProfileType: (id, profileType) => dispatch(updateProfileType(id, profileType))
    };
};

let UserManagementAPI = connect(mapStateToProps, mapDispatchToProps)(UserManagement);

export default UserManagementAPI;