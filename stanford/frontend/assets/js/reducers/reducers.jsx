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
		user: {
			"name": "Mocha Vasudevan",
			"username": "mocha",
			"location": "Palo Alto, CA",
			"description": "Sushi Chef",
			"image": "https://i.imgur.com/SfbReXM.jpg"
		},
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
			text: 'You are called to the scene of a 32-year-old male with respiratory distress. What is the easiest way to determine if his airway is open?',
			id: -1,
		}
	},
	category: -1
}

export function stanfordApp(state = initialState, action) {
    switch (action.type) {
        default:
        	return state;
    }
}