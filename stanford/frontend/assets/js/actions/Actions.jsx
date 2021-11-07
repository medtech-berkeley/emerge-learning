import 'whatwg-fetch';
import { refreshStudent } from "./LoadUserActions.jsx";
import { setLoadingStatus, incLoadingStatus } from './UIActions.jsx';

export const UPDATE_USERS = 'UPDATE_USERS';
export const UPDATE_CATEGORIES = 'UPDATE_CATEGORIES';
export const UPDATE_COURSES = 'UPDATE_COURSES';
export const UPDATE_INSTRUCTOR_COURSES = 'UPDATE_INSTRUCTOR_COURSES'
export const UPDATE_QUESTION_USER_DATA = 'UPDATE_QUESTION_USER_DATA';
export const UPDATE_CURRENT_QUESTION = 'UPDATE_CURRENT_QUESTION';
export const SELECT_CATEGORY = 'SELECT_CATEGORY';
export const UPDATE_SUBMIT_ERROR = 'DISPLAY_SUBMIT_ERROR';
export const UPDATE_CATEGORY_COMPLETED = 'DISPLAY_CATEGORY_COMPLETED';
export const UPDATE_CATEGORY_RESULTS = 'UPDATE_CATEGORY_RESULTS';
export const UPDATE_CATEGORY_DATA = 'UPDATE_CATEGORY_DATA';
export const UPDATE_PRACTICE_LEADERBOARD = 'UPDATE_PRACTICE_LEADERBOARD';
export const UPDATE_QUIZ_LEADERBOARD = 'UPDATE_QUIZ_LEADERBOARD';
export const UPDATE_WEEKLY_LEADERBOARD = 'UPDATE_WEEKLY_LEADERBOARD'
export const UPDATE_PREVIOUS_LEADERBOARD = 'UPDATE_PREVIOUS_LEADERBOARD';
export const UPDATE_TIMER = 'UPDATE_TIMER';
export const UPDATE_FEEDBACK_SUMMARY = 'UPDATE_FEEDBACK_SUMMARY';
export const SELECT_ANSWER = 'SELECT_ANSWER';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const UPDATE_CONSENT = 'UPDATE_CONSENT';
export const UPDATE_DEMOSURVEY = 'UPDATE_DEMOSURVEY';
export const UPDATE_COVIDSURVEY = 'UPDATE_COVIDSURVEY';

export function changePage(page) {
	return {
		type: CHANGE_PAGE,
		page
	}
}

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

export function startTime() {
	return dispatch => {
		setInterval(() => dispatch(updateTimer(Math.floor((new Date).getTime()/1000))), 500);
	}
}

export function updateTimer(time) {
	return {
		type: UPDATE_TIMER,
		time
	}
}

export function getCourses() {
	return dispatch => fetch("/api/courses", window.getHeader)
		.then(r => r.json().then(courses => {
			dispatch(updateCourses(courses))
		}));
}

export function updateCourses(courses) {
	return {
		type: UPDATE_COURSES,
		courses
	}
}

export function getInstructorCourses() {
	return dispatch => fetch("/api/instructorcourses", window.getHeader)
		.then(r => r.json().then(courses => {
			dispatch(updateInstructorCourses(courses))
		}));
}

export function updateInstructorCourses(instructor_courses) {
	return {
		type: UPDATE_INSTRUCTOR_COURSES,
		instructor_courses
	}
}

export function getCategories(course) {
	return dispatch => fetch("/api/quizzes?course=" + course, window.getHeader)
		.then(r => r.json().then(categories => {
			dispatch(updateCategories(categories, course))
		}));
}

export function updateCategories(categories, course) {
	return {
		type: UPDATE_CATEGORIES,
		categories,
		course
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
	}
}

export function updateCategoryData(name, maxTime, timeStarted, timeCompleted) {
	return {
		type: UPDATE_CATEGORY_DATA,
		name,
		maxTime,
		timeStarted,
		timeCompleted
	}
}

export function getCurrentQuestion(categoryId) {
	return dispatch => fetch("/quiz/question?quiz="+categoryId, window.getHeader)
		.then(r => r.json().then(question => {
			// console.debug(question);
			if (question.completed) {
				// console.debug("category completed.");
				dispatch(updateCategoryCompleted(categoryId, question.num_attempted, question.num_correct, question.outoftime))
			} else {
				// console.debug("dispatch update current question.");
				dispatch(updateCurrentQuestion(question))
			}
			dispatch(incLoadingStatus("quiz-" + categoryId));
		}));
}

export function startQuiz(categoryId) {
	return dispatch => {
		    dispatch(setLoadingStatus("quiz-" + categoryId, 0));
			fetch("/quiz/start?quiz="+categoryId, window.getHeader)
			.then(r => r.json().then(quiz => {
				dispatch(getCategoryData(categoryId));
				dispatch(getCurrentQuestion(categoryId));
			}));
	}
}

export function getCategoryData(categoryId) {
	return dispatch => fetch("/api/quizuserdata/" + categoryId, window.getHeader)
		.then(r => r.json().then(categoryUserData => {
			fetch("/api/quizzes/" + categoryId, window.getHeader)
			.then(r => r.json().then(category => {
				var time = category.max_time.split(':');
				let maxTime = (+time[0]) * 60 * 60 + (+time[1]) * 60 + (+time[2]);
				let timeStarted = Math.floor(Date.parse(categoryUserData.time_started) / 1000);
				let timeCompleted;
				if (categoryUserData.time_completed) {
					timeCompleted = Math.floor(Date.parse(categoryUserData.time_completed) / 1000);
				}
				dispatch(updateCategoryData(category.name, maxTime, timeStarted, timeCompleted));
				dispatch(incLoadingStatus("quiz-" + categoryId));
			}));
		}));
}

export function updateCurrentQuestion(currentQuestion) {
	return {
        type: UPDATE_CURRENT_QUESTION,
        currentQuestion
    }
}

export function selectAnswer(answerId) {
	return {
		type: SELECT_ANSWER,
		answerId
	}
}

export function answerQuestion(questionId, answerId, categoryId) {
    let headers = Object.assign({}, window.postFormHeader);
    let data = new FormData();
    data.append("question", questionId);
    data.append("answer", answerId);
    data.append("quiz", categoryId);
    headers.body = data;
	return dispatch => {
		fetch("/quiz/answer", headers)
		.then(r => r.json().then(answer => {
			if (answer.accepted) {
				dispatch(getCurrentQuestion(categoryId))
				// console.debug("answer accepted")
			} else {
				dispatch(updateSubmitError(answer.reason));
			}
		}));
	}
}

export function updateSubmitError(reason) {
	return {
		type: UPDATE_SUBMIT_ERROR,
		reason
	}
}

export function updateCategoryCompleted(categoryId, num_attempted, num_correct, outoftime) {
	return {
		type: UPDATE_CATEGORY_COMPLETED,
		categoryId,
		num_attempted,
		num_correct,
		outoftime
	}
}

export function getResults(categoryId) {
	return dispatch => fetch("/quiz/results?quiz=" + categoryId, window.getHeader)
	.then(r => r.json().then(json => {
	    // TODO: add check for accepted
		dispatch(updateCategoryResults(json.results))
	}));
}

export function updateCategoryResults(results) {
	return {
		type: UPDATE_CATEGORY_RESULTS,
		results
	}
}

export function updatePracticeLeaderboard(leaderboardResult, course) {
	return {
		type: UPDATE_PRACTICE_LEADERBOARD,
		leaderboardResult,
		course
	}
}

export function updateQuizLeaderboard(leaderboardResult, course) {
	return {
		type: UPDATE_QUIZ_LEADERBOARD,
		leaderboardResult,
		course
	}
}

export function updateWeeklyLeaderboard(leaderboardResult, course) {
	return {
		type: UPDATE_WEEKLY_LEADERBOARD,
		leaderboardResult,
		course
	}
}

export function updatePreviousLeaderboard(leaderboardResult, course) {
	return {
		type: UPDATE_PREVIOUS_LEADERBOARD,
		leaderboardResult,
		course
	}
}

export function getPracticeLeaderboard(course) {
	return dispatch => fetch("/api/practiceleaderboard?course=" + course, window.getHeader)
	.then(r => r.json().then(json => {
		dispatch(updatePracticeLeaderboard(json, course))
	}));
}

export function getQuizLeaderboard(course) {
	return dispatch => fetch("/api/quizleaderboard?course=" + course, window.getHeader)
	.then(r => r.json().then(json => {
		dispatch(updateQuizLeaderboard(json, course))
	}));
}

export function getWeeklyLeaderboard(course) {
	return dispatch => fetch("/api/weeklyleaderboard?course=" + course, window.getHeader)
	.then(r => r.json().then(json => {
		dispatch(updateWeeklyLeaderboard(json, course))
	}));
}

export function getPreviousLeaderboard(course) {
	return dispatch => fetch("/api/previousleaderboard?course=" + course, window.getHeader)
	.then(r => r.json().then(json => {
		dispatch(updatePreviousLeaderboard(json, course))
	}));
}

export function submitFeedback(feedback, question) {
    let headers = Object.assign({}, window.postFormHeader);
    let data = new FormData();
    data.append("feedback", feedback);
    data.append("question", question);
	headers.body = data;
	return dispatch => fetch("/quiz/feedback", headers)
		.then(r => r.json().then(submit => {
			if (submit.accepted) {
				// console.debug("Feedback submitted")
			} else {
				// console.debug("Feedback submission failed")
			}
		}));
}

export function getFeedbackSummary() {
	return dispatch => fetch("/api/feedback", window.getHeader)
	.then(r => r.json().then(json => {
		dispatch(updateFeedbackSummary(json))
	}));
}

export function updateFeedbackSummary(feedback) {
	return {
		type: UPDATE_FEEDBACK_SUMMARY,
		feedback
	}
}

/* Handling for Consent form and Demographic survey */

export function submitConsentForm(consent) {
    let headers = Object.assign({}, window.postFormHeader);
    let data = new FormData();
    data.append("consent", consent);
	headers.body = data;
	return dispatch => fetch("/profile/consentsurvey", headers)
		.then(r => {
			// console.log(r);
			if (r.ok) {
				console.debug("Consent submitted")
				dispatch(updateConsentForm(r));
				dispatch(refreshStudent());
			} else {
				console.debug("Consent submission failed")
			}
		});
}

export function updateConsentForm(consentResult) {
	return {
		type: UPDATE_CONSENT,
		consentResult
	}
}

export function submitDemographicSurvey(reference) {
    let headers = Object.assign({}, window.postFormHeader);
    let data = new FormData(reference);
	headers.body = data;
	return dispatch => fetch("/profile/demosurvey", headers)
		.then(r => {
			if (r.ok) {
				console.debug("Demographic survey submitted")
				dispatch(updateDemographicForm(r));
				dispatch(refreshStudent());
			} else {
				console.debug("Demographic survey submission failed")
			}
		});
}

export function updateDemographicForm(demographicResult) {
	return {
		type: UPDATE_DEMOSURVEY,
		demographicResult
	}
}

export function submitCovid19Survey(reference) {
    let headers = Object.assign({}, window.postFormHeader);
    let data = new FormData(reference);
	headers.body = data;
	return dispatch => fetch("/profile/covid19survey", headers)
		.then(r => {
			if (r.ok) {
				console.debug("COVID19 survey submitted")
				dispatch(updateCovidForm(r));
				dispatch(refreshStudent());
			} else {
				console.debug("Demographic survey submission failed")
			}
		});
}

export function updateCovidForm(covidResult) {
	return {
		type: UPDATE_COVIDSURVEY,
		covidResult
	}
}