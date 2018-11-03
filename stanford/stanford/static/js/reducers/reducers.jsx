import { UPDATE_USERS, UPDATE_CATEGORIES, UPDATE_QUESTION_USER_DATA, SELECT_CATEGORY, UPDATE_CURRENT_QUESTION, UPDATE_SUBMIT_ERROR, UPDATE_CATEGORY_COMPLETED, UPDATE_CATEGORY_DATA } from "../actions/Actions";
import { UPDATE_USER } from "../actions/LoadUserActions";

const initialState = {
	api: {
		categories: [],
		user: [{
			"user": {
	            "username": "",
	            "password": "",
	            "email": ""
	        },
	        "name": "",
	        "location": "",
	        "description": "",
	        "image": ""
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
			answers: [],
			text: '',
			id: -1,
		}
	},
	ui: {
		categoryId: -1,
        maxTime: "1 10:00:00"
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
        "created": "2018-04-25T09:21:22.618444Z"
    },
		complete: false,
	}
}

export function stanfordApp(state = initialState, action) {
	let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
    	case (UPDATE_USERS):
	    	newState.api.users = action.users;
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
	    	break;
        case (UPDATE_USER):
	    	newState.api.user = action.user;
			break;
		case (UPDATE_CATEGORY_DATA):
			newState.api.user = action.user;
			break;
	}
	
	return newState;
}