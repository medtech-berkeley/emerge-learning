import { UPDATE_USERS, UPDATE_CATEGORIES, UPDATE_QUESTION_USER_DATA, SELECT_CATEGORY, UPDATE_CURRENT_QUESTION, UPDATE_SUBMIT_ERROR, UPDATE_CATEGORY_COMPLETED } from "../actions/Actions"
import { UPDATE_USER } from "../actions/LoadUserActions"

const initialState = {
	api: {
		categories: [
			{
				"id":0,
			    "name": "Brain Trauma Practice",
			    "start": "2018-02-18T23:09:57.383629Z",
			    "end": "2018-02-18T23:09:57.383654Z",
			    "sponsor": "Stanford EMI",
			    "is_challenge": false,
			    "img_src": "https://i.imgur.com/ryjOjG1.png",
			    "time_limit": 20,
			    "num_questions": 15
			},
			{
				"id":1,
			    "name": "Vehicle Collision",
			    "start": "2018-02-18T23:10:38.287416Z",
			    "end": "2018-02-18T23:10:38.287431Z",
			    "sponsor": "Stanford EMI",
			    "is_challenge": true,
			   	"img_src": "https://i.imgur.com/p4zFKOJ.png",
			   	"time_limit": 25,
			   	"num_questions": 13
			},
			{
				"id":2,
			    "name": "Resuscitation Protocols",
			    "start": "2018-02-18T23:11:09.668039Z",
			    "end": "2018-02-18T23:11:09.668060Z",
			    "sponsor": "Stanford EMI",
			    "is_challenge": true,
			    "img_src": "https://i.imgur.com/sq6ZrRI.png",
			    "time_limit": 30,
			    "num_questions": 12
			},
			{
				"id":3,
			    "name": "All Questions Practice",
			    "start": "2018-02-18T23:11:53.137297Z",
			    "end": "2018-02-18T23:11:53.137319Z",
			    "sponsor": "Stanford EMI",
			    "is_challenge": false,
			    "img_src": "https://i.imgur.com/cx5KGx0.png",
			    "time_limit": 15,
			    "num_questions": 10
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
		num_attempted: 0
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
            console.log("update category completed");
    		let newStateUpdateCC = Object.assign({}, state);
	    	newStateUpdateCC.ui.complete = true;
	    	newStateUpdateCC.ui.num_attempted = action.num_attempted;
	    	newStateUpdateCC.ui.num_correct = action.num_correct;
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