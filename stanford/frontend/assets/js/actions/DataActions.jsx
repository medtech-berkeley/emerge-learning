import 'whatwg-fetch';

export const UPDATE_DATA = 'UPDATE_DATA';

export function updateData(data) {
	return {
		type: UPDATE_DATA,
		data
	}
}

export function refreshData() {
	return dispatch => fetch("/stats", window.getHeader)
		.then(r => r.json().then(data => {
			dispatch(updateData(data))
		}));
}
