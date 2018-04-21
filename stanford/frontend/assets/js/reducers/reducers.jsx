const initialState = {
	api: {
		categories: [{
		    "name": "Brain Trauma",
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
		    "name": "All Questions",
		    "start": "2018-02-18T23:11:53.137297Z",
		    "end": "2018-02-18T23:11:53.137319Z",
		    "sponsor": "Stanford EMI",
		    "is_challenge": false,
		    "img_src": "https://i.imgur.com/cx5KGx0.png",
		    "time_limit": 15,
		    "num_questions": 10
		}]
	}
}

export function stanfordApp(state = initialState, action) {
    switch (action.type) {
        default:
        	return state;
    }
}