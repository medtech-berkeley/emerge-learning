import { connect } from 'react-redux'
import { UserDashboard } from '../components/UserDashboard'
import { refreshUser } from '../actions/LoadUserActions'
import { refreshData } from '../actions/DataActions'

const mapStateToProps = state => {
    return {user: state.api.user, data: state.api.data};
};

const mapDispatchToProps = (dispatch) => {
    return {
        refreshUser: () => dispatch(refreshUser()),
        refreshData: () => dispatch(refreshData())
    };
};

let UserDashboardApi = connect(mapStateToProps, mapDispatchToProps)(UserDashboard);

export default UserDashboardApi;
