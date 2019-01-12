export const ADD_MESSAGE = 'ADD_MESSAGE';

export function addMessage(context, message, stream) {
	return {
		type: ADD_MESSAGE,
        context,
        stream,
        message
	}
}

export function throwError(context, message) {
    return addMessage(context, message, 'error')
}

export function sendMessage(context, message) {
    return addMessage(context, message, 'message')
}
