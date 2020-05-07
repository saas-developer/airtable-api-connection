import {
    APP_BUSY
} from './actionsApp';

export default function auth(state = {}, action) {
    switch(action.type) {
        case APP_BUSY: {
            return {
                ...state,
                busy: action.payload
            }
        }
        default: return state;
    }
}
