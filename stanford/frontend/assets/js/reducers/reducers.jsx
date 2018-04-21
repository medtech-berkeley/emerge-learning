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
		]
	}
}

export function stanfordApp(state = initialState, action) {
    switch (action.type) {
        default:
        	return state;
    }
}