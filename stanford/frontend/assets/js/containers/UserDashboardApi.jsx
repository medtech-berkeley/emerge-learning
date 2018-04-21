import { connect } from 'react-redux'
import { UserDashboard } from '../components/UserDashboard'

const mapStateToProps = state => {
    return {user: state.api.user, data: state.api.data};
};

const mapDispatchToProps = dispatch => {
    return {};
};

let UserDashboardApi = connect(mapStateToProps, mapDispatchToProps)(UserDashboard);

export default UserDashboardApi;
