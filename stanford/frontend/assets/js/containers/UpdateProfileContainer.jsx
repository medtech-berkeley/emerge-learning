import { connect } from 'react-redux'
import { UpdateProfile } from '../components/profile/UpdateProfile'

const mapStateToProps = state => {
    return {student: state.api.user};
};

const mapDispatchToProps = dispatch => {
    return {};
};

let UpdateProfileContainer = connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);

export default UpdateProfileContainer;
