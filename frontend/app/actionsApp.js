export const APP_BUSY = 'APP_BUSY';
export const SET_API_URL = 'SET_API_URL';
export consts ADD_HEADER = 'ADD_HEADER';

export function setBusy(payload) {
    return {
        type: APP_BUSY,
        payload
    }
}

export function setApiUrl(payload) {
    return {
        type: SET_API_URL,
        payload
    }   
}

export function addHeader(payload) {
    return {
        type: ADD_HEADER,
        payload
    }
}
