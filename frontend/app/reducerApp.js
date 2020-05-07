import {
    APP_BUSY,
    SET_API_URL
} from './actionsApp';

const defaultState = {
    busy: false,
    apiConfig: {}
}

export default function auth(state = defaultState, action) {
    switch(action.type) {
        case APP_BUSY: {
            return {
                ...state,
                busy: action.payload
            }
        }

        case SET_API_URL: {
            const apiConfig = state.apiConfig || {};
            apiConfig.url = action.payload;

            return {
                ...state,
                apiConfig: {
                    ...apiConfig
                }
            }
        }
        default: return state;
    }
}
