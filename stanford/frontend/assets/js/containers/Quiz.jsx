import { connect } from 'react-redux'
import { QuizBase } from '../components/QuizBase'

const mapStateToProps = state => {
    return {question: state.api.categories};
};

const mapDispatchToProps = dispatch => {
    return {};
};

let MainDashboardApi = connect(mapStateToProps, mapDispatchToProps)(QuizBase);

export default MainDashboardApi;
