import { UPDATE_USERS, UPDATE_CATEGORIES, UPDATE_QUESTION_USER_DATA, SELECT_CATEGORY, UPDATE_CURRENT_QUESTION, UPDATE_SUBMIT_ERROR, UPDATE_CATEGORY_COMPLETED } from "../actions/Actions";
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
    switch (action.type) {
    	case (UPDATE_USERS):
    		let newStateUpdateUsers = Object.assign({}, state);
	    	newStateUpdateUsers.api.users = action.users;
	    	return newStateUpdateUsers;
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
            console.log("update category completed")
    		let newStateUpdateCC = Object.assign({}, state);
	    	newStateUpdateCC.ui.complete = true;
	    	return newStateUpdateCC;
        case (UPDATE_USER):
			let newStateUpdateUser = Object.assign({}, state);
	    	newStateUpdateUser.api.user = action.user;
	    	console.log("update jobs");
	    	console.log(action);
			return newStateUpdateUser;
		default:
			return state;
    }
}