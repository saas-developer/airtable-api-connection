import {
    APP_BUSY,
    SET_API_URL,
    SET_API_HEADER,
    SET_DATA_PATH
} from './actionsApp';
import { globalConfig } from '@airtable/blocks';

const url = globalConfig.get(['apiConfig', 'url']) || '';
const headers = globalConfig.get(['apiConfig', 'headers']) || [];
const dataPath = globalConfig.get(['apiConfig', 'dataPath']) || [];

const defaultState = {
    busy: false,
    apiConfig: {
        url,
        headers,
        dataPath
    }
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

        case SET_DATA_PATH: {
            const apiConfig = state.apiConfig || {};
            apiConfig.dataPath = action.payload;

            return {
                ...state,
                apiConfig: {
                    ...apiConfig
                }
            }
        }

        case SET_API_HEADER: {
            const headers = state.apiConfig.headers;
            let {
                value,
                index,
                type
            } = action.payload;
            if (value === '') {
                value = undefined;
            }

            if (index === headers.length) {
                // This is new entry
                // TODO: Find a better way than using -1
                headers.push({
                    key: '',
                    value: ''
                })
            }
            headers[index][type] = value;

            const apiConfig = state.apiConfig;
            apiConfig.headers = [...headers];

            // Set new headers in globalConfig
            // This should not be in reducer
            globalConfig.setAsync(['apiConfig', 'headers'], headers)

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
