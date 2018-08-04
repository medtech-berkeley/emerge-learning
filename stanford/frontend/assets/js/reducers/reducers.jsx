import { UPDATE_USERS, UPDATE_CATEGORIES, UPDATE_QUESTION_USER_DATA, SELECT_CATEGORY, UPDATE_CURRENT_QUESTION, UPDATE_SUBMIT_ERROR, UPDATE_CATEGORY_COMPLETED, UPDATE_CATEGORY_RESULTS } from "../actions/Actions"
import { UPDATE_LEADERBOARD } from "../actions/Actions"
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
            "password": "pbkdf2_sha256$100000$g741LHEjcvCh$ISomNy9RhVXJsL25Rwy8SF6MX6wRweM+XKvEClZd/TA=",
            "email": "arjunsv@berkeley.edu"
        },
        "name": "PLACE HOLDER",
        "location": "Palo Alto",
        "description": "Student",
        "image": "http://127.0.0.1:8000/media/profile_images/image.jpg"
    	}],
    	leaderboardResult: [],
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
		categoryId: -1,
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
        "created": "2018-04-25T09:21:22.618444Z",
        "max_time": "1 10:00:00"
    },
		complete: false,
		num_correct: 0,
		num_attempted: 0,
		results: [],
	},
};

export function stanfordApp(state = initialState, action) {
    switch (action.type) {
    	case (UPDATE_STUDENTS):
    		let newStateUpdateStudents = Object.assign({}, state);
	    	newStateUpdateStudents.api.students = action.students;
	    	return newStateUpdateStudents;
    	case (UPDATE_CATEGORIES):
			let newStateUpdateCategories = Object.assign({}, state);
	    	newStateUpdateCategories.api.categories = action.categories;
	    	return newStateUpdateCategories;
    	case (UPDATE_QUESTION_USER_DATA):
    		let newStateUpdateQUD = Object.assign({}, state);
	    	newStateUpdateQUD.api.questionUserData = action.questionUserData;
	    	return newStateUpdateQUD;
	    case (SELECT_CATEGORY):
	    	let newStateSelectCategory = Object.assign({}, state);
	    	newStateSelectCategory.ui.categoryId = action.categoryId;
	    	return newStateSelectCategory;	
    	case (UPDATE_CURRENT_QUESTION):
    		let newStateCurrentQuestion = Object.assign({}, state);
	    	newStateCurrentQuestion.ui.currentQuestion = action.currentQuestion;
	    	return newStateCurrentQuestion;
    	case (UPDATE_SUBMIT_ERROR):
    		let newStateUpdateSubmitError = Object.assign({}, state);
	    	newStateUpdateSubmitError.api.questionUserData = action.questionUserData;
	    	return newStateUpdateSubmitError;
    	case (UPDATE_CATEGORY_COMPLETED):
    		let newStateUpdateCC = Object.assign({}, state);
	    	newStateUpdateCC.ui.complete = true;
	    	newStateUpdateCC.ui.num_attempted = action.num_attempted;
	    	newStateUpdateCC.ui.num_correct = action.num_correct;
	    	return newStateUpdateCC;
        case UPDATE_STUDENT:
			let newStateUpdateUser = Object.assign({}, state);
	    	newStateUpdateUser.api.user = action.user;
			return newStateUpdateUser;
		case (UPDATE_DATA):
			let newStateUpdateData = Object.assign({}, state);
			newStateUpdateData.api.data = action.data;
			return newStateUpdateData;
        case (UPDATE_CATEGORY_RESULTS):
            let newState = Object.assign({}, state);
            newState.ui.results = action.results;
            return newState;
        case (UPDATE_LEADERBOARD):
        	console.log('in reducer update leaderboard');
        	let newStateLeaderboard = Object.assign({}, state);
        	newStateLeaderboard.api.leaderboardResult = action.leaderboardResult;
        	return newStateLeaderboard;
	default:
			return state;
    }
}