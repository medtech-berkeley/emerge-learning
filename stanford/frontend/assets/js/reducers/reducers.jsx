import { UPDATE_CATEGORY_DATA, UPDATE_CATEGORIES, UPDATE_QUESTION_USER_DATA, SELECT_CATEGORY, UPDATE_CURRENT_QUESTION, UPDATE_SUBMIT_ERROR, UPDATE_CATEGORY_COMPLETED, UPDATE_CATEGORY_RESULTS, UPDATE_FEEDBACK_SUMMARY, SELECT_ANSWER, CHANGE_PAGE, UPDATE_COURSES } from "../actions/Actions"
import { UPDATE_TIMER, UPDATE_CONSENT, UPDATE_DEMOSURVEY} from "../actions/Actions"
import { UPDATE_PRACTICE_LEADERBOARD, UPDATE_QUIZ_LEADERBOARD, UPDATE_WEEKLY_LEADERBOARD, UPDATE_PREVIOUS_LEADERBOARD } from "../actions/Actions"
import { UPDATE_STUDENT, UPDATE_STUDENTS } from "../actions/LoadUserActions"
import { UPDATE_DATA } from "../actions/DataActions"
import { ADD_MESSAGE, SET_LOAD_STATUS, INC_LOAD_STATUS } from "../actions/UIActions";

const initialState = {
    api: {
        categories: {},
        courses: [],
        user: {
            "user": {
                "username": "",
                "email": "",
            },
            "name": "",
            "location": "",
            "description": "",
            "image": "",
            "consent_prompt_required": false,
            "consent": false,
            "completed_demographic_survey": true,
            "completed_covid19_survey": true,
            "profile_type": "STUD"
        },
        students: [],
        practiceLeaderboardResult: {},
        quizLeaderboardResult: {},
        weeklyLeaderboardResult: {},
        previousLeaderboardResult: {},
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
        loaded: {},
        messages: {},
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

function scoreComp(a, b) {
    return parseFloat(b.score) - parseFloat(a.score);
}

export function stanfordApp(state = initialState, action) {
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case (UPDATE_TIMER):
            newState.ui.currentTime = action.time;
            break;
        case SET_LOAD_STATUS:
            newState.ui.loaded[action.id] = action.status;
            break;
        case INC_LOAD_STATUS:
            newState.ui.loaded[action.id]++;
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
                        let diff = a.is_completed - b.is_completed;
                        if (diff = 0) {
                            return -1
                        } else {
                            return a.id - b.id;
                        }
                });
                newState.api.categories[action.course] = categoriesSorted;
                break;
        case (UPDATE_COURSES):
            newState.api.courses = action.courses.sort((c1, c2) => c1.priority - c2.priority);
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
        case (UPDATE_PRACTICE_LEADERBOARD):
            let practiceLeaderboardResultSorted = action.leaderboardResult.sort(scoreComp);
            newState.api.practiceLeaderboardResult[action.course] = practiceLeaderboardResultSorted;
            break;
        case (UPDATE_QUIZ_LEADERBOARD):
            let quizLeaderboardResultSorted = action.leaderboardResult.sort(scoreComp);
            newState.api.quizLeaderboardResult[action.course] = quizLeaderboardResultSorted;
            break;
        case (UPDATE_WEEKLY_LEADERBOARD):
            let weeklyLeaderboardResultSorted = action.leaderboardResult.sort(scoreComp);
            newState.api.weeklyLeaderboardResult[action.course] = weeklyLeaderboardResultSorted;
            break;
        case (UPDATE_PREVIOUS_LEADERBOARD):
            let previousLeaderboardResultSorted = action.leaderboardResult.sort(scoreComp);
            newState.api.previousLeaderboardResult[action.course] = previousLeaderboardResultSorted;
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
