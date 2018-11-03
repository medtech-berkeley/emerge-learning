import 'whatwg-fetch';

export const UPDATE_USERS = 'UPDATE_USERS'
export const UPDATE_CATEGORIES = 'UPDATE_CATEGORIES'
export const UPDATE_QUESTION_USER_DATA = 'UPDATE_QUESTION_USER_DATA'
export const UPDATE_CURRENT_QUESTION = 'UPDATE_CURRENT_QUESTION';
export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const UPDATE_SUBMIT_ERROR = 'DISPLAY_SUBMIT_ERROR';
export const UPDATE_CATEGORY_COMPLETED = 'DISPLAY_CATEGORY_COMPLETED'

export function getUsers() {
	return dispatch => fetch("/api/users", window.getHeader)
	.then(r => r.json().then(users => {
		dispatch(updateUsers(users))
	}));
}

export function updateUsers(users) {
	return {
		type: UPDATE_USERS,
		users
	}
}

export function getCategories() {
	return dispatch => fetch("/api/categories", window.getHeader)
		.then(r => r.json().then(categories => {
			dispatch(updateCategories(categories))
		}));
}

export function updateCategories(categories) {
	return {
		type: UPDATE_CATEGORIES,
		categories
	}
}

export function getQuestionUserData() {
	return dispatch => fetch("/api/questionuserdata", window.getHeader)
	.then(r => r.json().then(questionUserData => {
		dispatch(updateQuestionUserData(questionUserData))
	}));
}

export function updateQuestionUserData(questionUserData) {
	return {
		type: UPDATE_QUESTION_USER_DATA,
		questionUserData
	}
}

export function selectCategory(categoryId) {
	return {
		type: SELECT_CATEGORY, 
		categoryId
			if (question.completed) {
	}
}

export function getCurrentQuestion(categoryId) {
	return dispatch => fetch("/quiz/question?category="+categoryId, window.getHeader)
		.then(r => r.json().then(question => {
			console.log(question)
				console.log("category completed.")
				dispatch(updateCategoryCompleted(categoryId))
			} else {
				console.log("dispatch update current question.")
				dispatch(updateCurrentQuestion(question))
			}
		}));
}

export function updateCurrentQuestion(currentQuestion) {
	return {
        type: UPDATE_CURRENT_QUESTION,
        currentQuestion
    }
}

export function answerQuestion(questionId, answerId, categoryId) {
    let headers = Object.assign({}, window.postFormHeader);
    let data = new FormData();
    data.append("question", questionId);
    data.append("answer", answerId);
    headers.body = data;
	return dispatch => fetch("/quiz/answer", headers)
		.then(r => r.json().then(answer => {
			if (answer.accepted) {
				dispatch(getCurrentQuestion(categoryId))
				console.log("answer accepted")
			} else {
				dispatch(updateSubmitError(answer.reason));
			}
		}));
}

export function updateSubmitError(reason) {
	return {
		type: UPDATE_SUBMIT_ERROR,
		reason
	}
}

export function updateCategoryCompleted(categoryId) {
	return {
		type: UPDATE_CATEGORY_COMPLETED,
		categoryId
	}
}


