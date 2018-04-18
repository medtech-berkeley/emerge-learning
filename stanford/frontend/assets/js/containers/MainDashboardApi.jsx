import { connect } from 'react-redux'
import { MainDashboard } from '../components/MainDashboard'

const mapStateToProps = state => {
    return {categories: state.api.categories};
};

const mapDispatchToProps = dispatch => {
    return {};
};

let MainDashboardApi = connect(mapStateToProps, mapDispatchToProps)(MainDashboard);

export default MainDashboardApi;