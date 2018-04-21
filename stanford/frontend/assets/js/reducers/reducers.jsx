const initialState = {
	api: {
		categories: [
			{
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
		questions: [
			{



			}
		],

		answers: [
			{
		        "id": 1,
		        "text": "B",
		        "is_correct": true
		    },
		    {
		        "id": 2,
		        "text": "A",
		        "is_correct": false
		    },
		    {
		        "id": 3,
		        "text": "C",
		        "is_correct": false
		    },
		    {
		        "id": 4,
		        "text": "D",
		        "is_correct": false
		    },
		    {
		        "id": 5,
		        "text": "E",
		        "is_correct": false
		    },
		    {
		        "id": 6,
		        "text": "F",
		        "is_correct": false
		    },
		    {
		        "id": 7,
		        "text": "D",
		        "is_correct": true
		    },
		    {
		        "id": 8,
		        "text": "A",
		        "is_correct": false
		    },
		    {
		        "id": 9,
		        "text": "B",
		        "is_correct": false
		    },
		    {
		        "id": 10,
		        "text": "C",
		        "is_correct": false
		    },
		    {
		        "id": 11,
		        "text": "E",
		        "is_correct": false
		    },
		    {
		        "id": 12,
		        "text": "F",
		        "is_correct": false
		    }
		],
		user: {
			"name": "Arjun Vasudevan",
			"username": "One Beat",
			"location": "Berkeley, CA",
			"description": "Sophomore at UC Berkeley",
			"image": "https://scontent-lax3-2.xx.fbcdn.net/v/t35.18174-12/22092563_1710459192298519_1703759275_o.jpg?_nc_cat=0&oh=8b0dc0707bbddc672f51df34979439c8&oe=5ADB9B11"
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
		}]
	}
}

export function stanfordApp(state = initialState, action) {
    switch (action.type) {
        default:
        	return state;
    }
}