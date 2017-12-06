import * as types from './actionTypes';

export function requestContent() {
    return {
        type: types.HOME_REQUEST
    }
}

export function success(data) {
    return {
        type: types.HOME_SUCCESS,
        memories: data.memories
    }
}
