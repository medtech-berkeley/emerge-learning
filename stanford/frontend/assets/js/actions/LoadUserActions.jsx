import 'whatwg-fetch';

export const UPDATE_USER = 'UPDATE_USER';

export function updateUser(user) {
	return {
		type: UPDATE_USER,
		user
	}
}

export function refreshUser() {
	return dispatch => fetch("/api/students", window.getHeader)
		.then(r => r.json().then(user => {
			dispatch(updateUser(user))
		}));
}
