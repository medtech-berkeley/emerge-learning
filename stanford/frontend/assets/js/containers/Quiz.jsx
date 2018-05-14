import { connect } from 'react-redux'
import { QuizBase } from '../components/QuizBase'
import { getCurrentQuestion, answerQuestion }from '../actions/Actions'

const mapStateToProps = state => {
	return {currentQuestion: state.ui.currentQuestion, categoryId: state.ui.categoryId, complete: state.ui.complete};
};

const mapDispatchToProps = dispatch => {
    return {
    	getCurrentQuestion: (categoryId) => dispatch(getCurrentQuestion(categoryId)),
    	answerQuestion: (questionId, answerId, categoryId) => dispatch(answerQuestion(questionId, answerId, categoryId))
    };
};

let Quiz = connect(mapStateToProps, mapDispatchToProps)(QuizBase);

export default Quiz;