import { UPDATE_CATEGORY_DATA, UPDATE_CATEGORIES, UPDATE_QUESTION_USER_DATA, SELECT_CATEGORY, UPDATE_CURRENT_QUESTION, UPDATE_SUBMIT_ERROR, UPDATE_CATEGORY_COMPLETED, UPDATE_CATEGORY_RESULTS } from "../actions/Actions"
import { UPDATE_LEADERBOARD, UPDATE_TIMER } from "../actions/Actions"
import { UPDATE_STUDENT, UPDATE_STUDENTS } from "../actions/LoadUserActions"
import { UPDATE_DATA } from "../actions/DataActions"

const initialState = {
    api: {
        categories: [
            {
                "id":0,
                "name": " ",
                "start": "2018-02-18T23:09:57.383629Z",
                "end": "2018-02-18T23:09:57.383654Z",
                "sponsor": " ",
                "is_challenge": false,
                "img_src": " ",
                "time_limit": 20,
                "num_questions": 15
            }
        ],
        user: [{
            "user": {
                "username": "One Beat",
                "email": "arjun@arjun.com",
                "password": "secret"
            },
            "name": "Arjun Vasudevan",
            "location": "Berkeley, CA",
            "description": "Sophomore at UC Berkeley",
            "image": "https://scontent-lax3-2.xx.fbcdn.net/v/t35.18174-12/22092563_1710459192298519_1703759275_o.jpg?_nc_cat=0&oh=8b0dc0707bbddc672f51df34979439c8&oe=5ADB9B11"
        }],
        students: [{
        "user": {
            "username": "PLACEHOLDER",
            "email": "arjunsv@berkeley.edu"
        },
        "name": "PLACE HOLDER",
        "location": "Palo Alto",
        "description": "Student",
        "image": "http://127.0.0.1:8000/media/profile_images/image.jpg"
        }],
        leaderboardResult: [],
        questionUserData: [{
            "student": {
                "user": {
                    "username": "stanford",
                    "email": ""
                }
            },
            "question": 5,
            "answer": {
                "is_correct": false
            },
            "time_started": "2018-10-31T05:14:49.375496Z",
            "time_completed": "2018-10-31T05:14:57.841436Z"
        },
        {
            "student": {
                "user": {
                    "username": "stanford",
                    "email": ""
                }
            },
            "question": 4,
            "answer": {
                "is_correct": false
            },
            "time_started": "2018-10-31T05:15:08.748471Z",
            "time_completed": "2018-10-31T05:15:21.998949Z"
        }],
        data: [{
            "day": "1",
            "points": 100
        },
        {
            "day": "2",
            "points": 180
        },
        {
            "day": "3",
            "points": 210
        },
        {
            "day": "4",
            "points": 200
        },
        {
            "day": "5",
            "points": 100
        },
        {
            "day": "6",
            "points": 80
        },
        {
            "day": "7",
            "points": 120
}],
        question: {
            answers: ['Kill her', 'Run away', 'Apply aloe-vera to her gunshot wound', 'Check her vitals'],
            text: 'You find a woman with blue lips after a loud noise was heard. What do you do?',
            id: -1,
        }
    },
    ui: {
	currentTime: 67,
	categoryId: -1,
	timeStarted: Math.floor((new Date).getTime()/1000),
    maxTime: 300,
    categoryId: -1,
    categoryName: "Blood Science",
    currentQuestion: {
    "id": -1,
    "category": "Default",
    "text": "Default",
    "answers": [
        {
            "id": 1,
            "text": "Default a1.",
            "is_correct": false
        },
        {
            "id": 2,
            "text": "Default a2",
            "is_correct": true
        },
        {
            "id": 3,
            "text": "Default a3",
            "is_correct": false
        },
        {
            "id": 4,
            "text": "Default a4",
            "is_correct": false
        }
    ],
    created: "2018-04-25T09:21:22.618444Z"
    },
        complete: false,
        num_correct: 0,
        num_attempted: 0,
        results: [],
    },
};

export function stanfordApp(state = initialState, action) {
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
	case (UPDATE_TIMER):
		newState.ui.currentTime = action.time;
		break;
    case (UPDATE_STUDENTS):
        newState.api.students = action.students;
        break;
    case (UPDATE_CATEGORIES):
        newState.api.categories = action.categories;
        break;
    case (UPDATE_QUESTION_USER_DATA):
        newState.api.questionUserData = action.questionUserData;
        break;
	case (SELECT_CATEGORY):
        newState.ui.categoryId = action.categoryId;
        break;
    case (UPDATE_CURRENT_QUESTION):
        newState.ui.currentQuestion = action.currentQuestion;
        break;
    case (UPDATE_SUBMIT_ERROR):
        newState.api.questionUserData = action.questionUserData;
        break;
    case (UPDATE_CATEGORY_COMPLETED):
        newState.ui.complete = true;
        newState.ui.num_attempted = action.num_attempted;
        newState.ui.num_correct = action.num_correct;
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
        newState.api.leaderboardResult = action.leaderboardResult;
        break;
	case (UPDATE_CATEGORY_DATA):
        newState.ui.maxTime = action.maxTime;
        newState.ui.categoryName = action.name;
		newState.ui.timeCompleted = action.timeCompleted;
		newState.ui.timeStarted = action.timeStarted;
		break;
	}

	return newState;
}
