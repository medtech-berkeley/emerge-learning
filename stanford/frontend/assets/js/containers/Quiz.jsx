import { connect } from 'react-redux'
import { QuizBase } from '../components/QuizBase'
import { getCurrentQuestion, answerQuestion, getResults }from '../actions/Actions'

const mapStateToProps = state => {
	return {...state.ui};
};

const mapDispatchToProps = dispatch => {
    return {
    	getCurrentQuestion: (categoryId) => dispatch(getCurrentQuestion(categoryId)),
    	answerQuestion: (questionId, answerId, categoryId) => dispatch(answerQuestion(questionId, answerId, categoryId)),
		getResults: (categoryId) => dispatch(getResults(categoryId))
    };
};

let Quiz = connect(mapStateToProps, mapDispatchToProps)(QuizBase);

export default Quiz;