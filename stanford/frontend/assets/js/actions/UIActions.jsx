export const ADD_MESSAGE = 'ADD_MESSAGE';
export const SET_LOAD_STATUS = 'SET_LOAD_STATUS';
export const INC_LOAD_STATUS = 'INC_LOAD_STATUS';

export function addMessage(context, message, stream) {
	return {
		type: ADD_MESSAGE,
        context,
        stream,
        message
	}
}

export function setLoadingStatus(id, status) {
	return {
        type: SET_LOAD_STATUS,
        id,
        status
	}
}

export function incLoadingStatus(id) {
	return {
        type: INC_LOAD_STATUS,
        id
	}
}

export function throwError(context, message) {
    return addMessage(context, message, 'error')
}

export function sendMessage(context, message) {
    return addMessage(context, message, 'message')
}
