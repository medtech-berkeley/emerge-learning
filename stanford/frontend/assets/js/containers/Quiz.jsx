import { connect } from 'react-redux'
import { QuizBase } from '../components/QuizBase'

const mapStateToProps = state => {
    let question = Object.assign({}, state.api.question);
    question.category = state.category;
    return question;
};

const mapDispatchToProps = dispatch => {
    return {};
};

let Quiz = connect(mapStateToProps, mapDispatchToProps)(QuizBase);

export default Quiz;
