import { UPDATE_CATEGORY_DATA, UPDATE_CATEGORIES, UPDATE_QUESTION_USER_DATA, SELECT_CATEGORY, UPDATE_CURRENT_QUESTION, UPDATE_SUBMIT_ERROR, UPDATE_CATEGORY_COMPLETED, UPDATE_CATEGORY_RESULTS, UPDATE_FEEDBACK_SUMMARY, SELECT_ANSWER, CHANGE_PAGE } from "../actions/Actions"
import { UPDATE_LEADERBOARD, UPDATE_TIMER, UPDATE_CONSENT, UPDATE_DEMOSURVEY} from "../actions/Actions"
import { UPDATE_STUDENT, UPDATE_STUDENTS } from "../actions/LoadUserActions"
import { UPDATE_DATA } from "../actions/DataActions"
import { ADD_MESSAGE } from "../actions/UIActions";

const initialState = {
    api: {
        categories: [],
        user: {
            "user": {
                "username": "",
                "email": "",
            },
            "name": "",
            "location": "",
            "description": "",
            "image": "",
            "profile_type": "STUD"
        },
        students: [],
        leaderboardResult: [],
        questionUserData: [],
        data: [],
        question: {
            answers: ['Help her', 'Run away', 'Apply aloe-vera to her gunshot wound', 'Check her vitals'],
            text: 'You find a woman with blue lips after a loud noise was heard. What do you do?',
            id: -1,
        }
    },
    ui: {
        currentTime: Math.floor((new Date).getTime()/1000),
        page: 'dashboard',
        timeStarted: Math.floor((new Date).getTime()/1000),
        maxTime: 300,
        categoryId: -1,
        categoryName: "",
        currentQuestion: {
            id: -1,
            category: "",
            text: "",
            answers: [],
            created: "",
            selectedAnswer: null
        },
        outoftime: false,
        complete: false,
        num_correct: 0,
        num_attempted: 0,
        results: [],
        messages: {}
    },
};

function patchData(list, key, item) {
    var changed = false;
    for (var i = 0; i < list.length; i++) {
        if (list[i][key] == item[key]) {
            list[i] = item;
            changed = true;
        }
    }

    if (!changed) {
        list.push(item);
    }
}

export function stanfordApp(state = initialState, action) {
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case (UPDATE_TIMER):
            newState.ui.currentTime = action.time;
            break;
        case (CHANGE_PAGE):
            newState.ui.page = action.page
            break;
        case (UPDATE_STUDENTS):
            if (Array.isArray(action.students)) {
                newState.api.students = action.students;
            } else {
                patchData(newState.api.students, 'id', action.students);
            }
            break;
        case (UPDATE_CATEGORIES):
            let categoriesSorted = action.categories.sort(
                (a, b) => {
                return a.is_completed - b.is_completed;
            });
            newState.api.categories = categoriesSorted;
            break;
        case (ADD_MESSAGE):
            if (!newState.ui.messages[action.context]) {
                newState.ui.messages[action.context] = [];
            }

            newState.ui.messages[action.context].push(
                {
                    message: action.message,
                    stream: action.stream
                });
            break;
        case (UPDATE_QUESTION_USER_DATA):
            newState.api.questionUserData = action.questionUserData;
            break;
        case (SELECT_CATEGORY):
            newState.ui.categoryId = action.categoryId;
            newState.ui.complete = initialState.ui.complete;
            newState.ui.outoftime = initialState.ui.outoftime;
            break;
        case (UPDATE_CURRENT_QUESTION):
            newState.ui.currentQuestion = action.currentQuestion;
            newState.ui.currentQuestion.selectedAnswer = null;
            break;
        case (UPDATE_SUBMIT_ERROR):
            newState.api.questionUserData = action.questionUserData;
            break;
        case (UPDATE_CATEGORY_COMPLETED):
            newState.ui.complete = true;
            newState.ui.num_attempted = action.num_attempted;
            newState.ui.num_correct = action.num_correct;
            newState.ui.outoftime = action.outoftime;
            break;
        case UPDATE_STUDENT:
            newState.api.user = action.user;
            break;
        case (UPDATE_DATA):
            newState.api.data = action.data;
            break;
        case (UPDATE_CATEGORY_RESULTS):
            newState.ui.results = action.results;
            break;
        case (UPDATE_LEADERBOARD):
            let leaderboardResultSorted = action.leaderboardResult.sort(function(a, b) {
                return parseFloat(b.score) - parseFloat(a.score);
            });
            newState.api.leaderboardResult = leaderboardResultSorted;
            break;
        case (UPDATE_CATEGORY_DATA):
            newState.ui.maxTime = action.maxTime;
            newState.ui.categoryName = action.name;
            newState.ui.timeCompleted = action.timeCompleted;
            newState.ui.timeStarted = action.timeStarted;
            break;
        case (UPDATE_FEEDBACK_SUMMARY):
            newState.api.feedback = action.feedback;
            break;
        case (SELECT_ANSWER):
            newState.ui.currentQuestion.selectedAnswer = action.answerId;
            break;
	}

	return newState;
}
