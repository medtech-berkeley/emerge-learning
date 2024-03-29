import 'whatwg-fetch';
import { sendMessage, throwError } from './UIActions';

export const UPDATE_STUDENT = 'UPDATE_STUDENT';
export const UPDATE_STUDENTS = 'UPDATE_STUDENTS';

export function updateStudent(user) {
	return {
		type: UPDATE_STUDENT,
		user
	}
}

export function refreshStudent() {
	// console.log("refresh student action")
	return dispatch => fetch("/api/students/self", window.getHeader)
		.then(r => r.json().then(user => {
			dispatch(updateStudent(user))
		}));
}

export function updateStudents(students) {
	return {
		type: UPDATE_STUDENTS,
		students
	}
}

export function refreshStudents() {
	return dispatch => fetch("/api/students", window.getHeader)
		.then(r => r.json().then(students => {
			dispatch(updateStudents(students))
		}));
}

export function updateProfileType(id, profile_type) {
	let data = {
		profile_type
	};

	let patchData = JSON.parse(JSON.stringify(window.patchHeader));
	patchData.body = JSON.stringify(data);

	return dispatch => fetch("/api/students/" + id + "/", patchData)
	.then(r =>
		r.json().then(student => {
			dispatch(updateStudent(student));
			dispatch(sendMessage('userman', 'The user has been successfully updated!'));
		}))
	.catch(m => {
		console.error(m);
		dispatch(throwError('userman', 'An error has occured while updating the user.'));
	});
}