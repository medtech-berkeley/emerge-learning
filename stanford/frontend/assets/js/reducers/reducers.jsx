import { UPDATE_USERS, UPDATE_CATEGORIES, UPDATE_QUESTION_USER_DATA, SELECT_CATEGORY, UPDATE_CURRENT_QUESTION, UPDATE_SUBMIT_ERROR, UPDATE_CATEGORY_COMPLETED } from "../actions/Actions"

const initialState = {
	api: {
		categories: [],
		users: [],
		questionUserData: []
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
        default:
        	return state;
    }
}