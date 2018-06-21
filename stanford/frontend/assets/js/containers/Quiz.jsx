import { connect } from 'react-redux'
import { QuizBase } from '../components/QuizBase'
import { getCurrentQuestion, answerQuestion }from '../actions/Actions'

const mapStateToProps = state => {
	return {...state.ui};
};

const mapDispatchToProps = dispatch => {
    return {
    	getCurrentQuestion: (categoryId) => dispatch(getCurrentQuestion(categoryId)),
    	answerQuestion: (questionId, answerId, categoryId) => dispatch(answerQuestion(questionId, answerId, categoryId))
    };
};

let Quiz = connect(mapStateToProps, mapDispatchToProps)(QuizBase);

export default Quiz;