import 'whatwg-fetch';

export const UPDATE_STUDENT = 'UPDATE_STUDENT';
export const UPDATE_STUDENTS = 'UPDATE_STUDENTS';

export function updateStudent(user) {
	return {
		type: UPDATE_STUDENT,
		user
	}
}

export function refreshStudent() {
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