import { connect } from 'react-redux'
import { QuizBase } from '../../components/quiz/QuizBase'
import { getCurrentQuestion, answerQuestion, getResults, getCategoryData, submitFeedback, selectAnswer, startQuiz } from '../../actions/Actions'
import { setLoadingStatus } from '../../actions/UIActions';

const mapStateToProps = state => {
	return {
		currentQuestion: state.ui.currentQuestion,
		categoryName: state.ui.categoryName,
		answerQuestion: state.ui.answerQuestion,
		currentTime: state.ui.currentTime,
		timeStarted: state.ui.timeStarted,
		maxTime: state.ui.maxTime,
		selectAnswer: state.ui.selectAnswer,
		complete: state.ui.complete,
		num_attempted: state.ui.num_attempted,
		num_correct: state.ui.num_correct,
		results: state.ui.results,
		outoftime: state.ui.outoftime,
		loaded: state.ui.loaded
	};
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
		setLoadingStatus: (id, status) => dispatch(setLoadingStatus(id, status))
    };
};

let Quiz = connect(mapStateToProps, mapDispatchToProps)(QuizBase);

export default Quiz;