import { connect } from 'react-redux'
import { UserManagement } from '../../components/instructor/UserManagement';
import { refreshStudents, updateProfileType } from '../../actions/LoadUserActions';

const mapStateToProps = state => {
    return {students: state.api.students};
};

const mapDispatchToProps = (dispatch) => {
    return {
        refreshStudents: () => dispatch(refreshStudents()),
        updateProfileType: (id, profileType) => dispatch(updateProfileType(id, profileType))
    };
};

let UserManagementAPI = connect(mapStateToProps, mapDispatchToProps)(UserManagement);

export default UserManagementAPI;