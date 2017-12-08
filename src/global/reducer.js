import * as types from './actionTypes'

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export default function global(state = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : false,
    message: false,
    content: [],
    page: 1,
    url: 0,
    image_loading: false,
    image_one: "",
    image_two: "",
    editMemory: false,
    show: false,
    showMemory: false,
    memory: {}
}, action) {
    switch (action.type) {
        case types.GLOBAL_CONTENT_REQUEST:
            return Object.assign({}, state, {
                url: action.url,
                page: action.page
            });
        case types.GLOBAL_CONTENT_SUCCESS:
            return Object.assign({}, state, {
                content: action.content
            });
        case types.GLOBAL_CONTENT_CLEAR:
            return Object.assign({}, state, {
                content: []
            });
        case types.GLOBAL_IMAGE_UPLOAD:
            return Object.assign({}, state, {
                file: action.file,
                action: action.action,
                image_loading: true
            });
        case types.GLOBAL_IMAGE_SUCCESS:
            return Object.assign({}, state, {
                image_loading: false
            });
        case types.GLOBAL_SET_IMAGES:
            let obj = {};
            if (typeof action.image_one !== 'undefined') {
                obj.image_one = action.image_one
            }
            if (typeof action.image_two !== 'undefined') {
                obj.image_two = action.image_two
            }
            return Object.assign({}, state, obj);
        case types.GLOBAL_SHOW_EDITOR:
            return Object.assign({}, state, {
                show: action.show,
                editMemory: action.editMemory
            });
        case types.GLOBAL_HIDE_EDITOR:
            return Object.assign({}, state, {
                show: false,
                editMemory: false
            });
        case types.GLOBAL_THOUGHT_REQUEST:
            return Object.assign({}, state, {
                thought: action.thought,
                action: action.action
            });
        case types.GLOBAL_THOUGHT_SUCCESS:
            return Object.assign({}, state, {
                thumbnail_url: ""
            });
        case types.GLOBAL_SHOW_MEMORY:
            return Object.assign({}, state, {
                memoryShow: true,
                memory: action.memory
            });
        case types.GLOBAL_HIDE_MEMORY:
            return Object.assign({}, state, {
                memoryShow: false,
                memory: {}
            });
        default:
            return state
    }
}
