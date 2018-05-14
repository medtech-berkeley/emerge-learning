import { connect } from 'react-redux'
import { UserDashboard } from '../components/UserDashboard'
import { refreshUser } from '../actions/LoadUserActions'

const mapStateToProps = state => {
    return {user: state.api.user, data: state.api.data};
};

const mapDispatchToProps = (dispatch) => {
    return {
        refreshUser: () => dispatch(refreshUser()),
    };
};

let UserDashboardApi = connect(mapStateToProps, mapDispatchToProps)(UserDashboard);

export default UserDashboardApi;
