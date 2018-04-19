const initialState = {
	api: {
		categories: [{
		    "name": "Brain Trauma",
		    "start": "2018-02-18T23:09:57.383629Z",
		    "end": "2018-02-18T23:09:57.383654Z",
		    "sponsor": "Stanford EMI",
		    "is_challenge": false
		},
		{
		    "name": "Vehicle Collision Response",
		    "start": "2018-02-18T23:10:38.287416Z",
		    "end": "2018-02-18T23:10:38.287431Z",
		    "sponsor": "Stanford EMI",
		    "is_challenge": false
		},
		{
		    "name": "Resuscitation Protocols",
		    "start": "2018-02-18T23:11:09.668039Z",
		    "end": "2018-02-18T23:11:09.668060Z",
		    "sponsor": "Stanford EMI",
		    "is_challenge": false
		},
		{
		    "name": "all_questions",
		    "start": "2018-02-18T23:11:53.137297Z",
		    "end": "2018-02-18T23:11:53.137319Z",
		    "sponsor": "Stanford EMI",
		    "is_challenge": false
		}],
		user: {
			"name": "Arjun Vasudevan",
			"username": "onebeat",
			"location": "Berkeley, CA",
			"description": "Sophomore at UC Berkeley"
		}
	}
}

export function stanfordApp(state = initialState, action) {
    switch (action.type) {
        default:
        	return state;
    }
}
