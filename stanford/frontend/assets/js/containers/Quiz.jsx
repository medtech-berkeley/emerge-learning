import { connect } from 'react-redux'
import { QuizBase } from '../components/quiz/QuizBase'
import { getCurrentQuestion, answerQuestion, getResults, getCategoryData, submitFeedback, selectAnswer, startQuiz } from '../actions/Actions'

const mapStateToProps = state => {
	return {...state.ui};
};

const mapDispatchToProps = dispatch => {
    return {
    	getCurrentQuestion: (categoryId) => dispatch(getCurrentQuestion(categoryId)),
    	startQuiz: (categoryId) => dispatch(startQuiz(categoryId)),
    	answerQuestion: (questionId, answerId, categoryId) => dispatch(answerQuestion(questionId, answerId, categoryId)),
		getResults: (categoryId) => dispatch(getResults(categoryId)),
		getCategoryData: (categoryId) => dispatch(getCategoryData(categoryId)),
		submitFeedback: (feedback, question) => dispatch(submitFeedback(feedback, question)),
		selectAnswer: (answerId) => dispatch(selectAnswer(answerId)),
    };
};

let Quiz = connect(mapStateToProps, mapDispatchToProps)(QuizBase);

export default Quiz;