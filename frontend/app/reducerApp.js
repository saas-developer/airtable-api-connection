import {
    APP_BUSY,
    SET_API_URL,
    SET_API_HEADER,
    SET_DATA_PATH,
    SET_NAME_FOR_REQUEST,
    SET_TABLE_TO_SAVE_API_DATA,
    SET_API_CONFIG
} from './actionsApp';
import { globalConfig } from '@airtable/blocks';
import {
    getFirstRequest
} from './utils/serializeRequests';

// const url = globalConfig.get(['apiConfig', 'url']) || '';
// const headers = globalConfig.get(['apiConfig', 'headers']) || [];

// const savedRequests = globalConfig.get('savedRequests');
// console.log('savedRequests', savedRequests);

function deleteGlobalConfig() {
    globalConfig.setAsync(['savedRequests'], undefined) || [];
}
// deleteGlobalConfig();

const savedRequest = {}; // getFirstRequest();

const defaultState = {
    busy: false,
    apiConfig: {
        ...savedRequest
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

        case SET_API_CONFIG: {
            return {
                ...state,
                apiConfig: {
                    ...action.payload
                }
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

        case SET_NAME_FOR_REQUEST: {
            const apiConfig = state.apiConfig || {};
            apiConfig.requestName = action.payload;

            return {
                ...state,
                apiConfig: {
                    ...apiConfig
                }
            }
        }

        case SET_TABLE_TO_SAVE_API_DATA: {
            const apiConfig = state.apiConfig || {};
            apiConfig.tableToSaveApiData = action.payload;

            return {
                ...state,
                apiConfig: {
                    ...apiConfig
                }
            }
        }

        case SET_API_HEADER: {
            const headers = state.apiConfig.headers || [];
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
            // globalConfig.setAsync(['apiConfig', 'headers'], headers)

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
