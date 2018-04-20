import { connect } from 'react-redux'
import { MainDashboard } from '../components/MainDashboard'

const mapStateToProps = state => {
    return {categories: state.api.categories, user: state.api.user, data: state.api.data};
};

const mapDispatchToProps = dispatch => {
    return {};
};

let MainDashboardApi = connect(mapStateToProps, mapDispatchToProps)(MainDashboard);

export default MainDashboardApi;
