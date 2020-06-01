import {
    APP_BUSY,
    SET_API_URL,
    SET_API_HEADER,
    SET_DATA_PATH,
    SET_NAME_FOR_REQUEST,
    SET_TABLE_TO_SAVE_API_DATA,
    SET_API_CONFIG,
    DELETE_API_CONFIG,
    USER_API_STATUS_START,
    USER_API_STATUS_SUCCESS,
    USER_API_STATUS_ERROR,
    AIRTABLE_API_STATUS_RESET,
    AIRTABLE_API_STATUS_START,
    AIRTABLE_API_STATUS_SUCCESS,
    AIRTABLE_API_STATUS_ERROR,
    SET_SAVED_REQUESTS
} from './actionsApp';
import { globalConfig } from '@airtable/blocks';
import {
    getFirstRequest
} from './utils/serializeRequests';
import _get from 'lodash/get';
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
    },
    userApiStatus: {
        busy: false,
        error: false,
        success: false
    },
    airtableApiStatus: {
        busy: false,
        error: false,
        success: false
    }
}

export default function auth(state = defaultState, action) {
    switch(action.type) {
        case SET_SAVED_REQUESTS: {
            const savedRequests = action.payload
            const newState = {
                ...state
            };
            newState.savedRequests = {
                ...savedRequests
            }
            return newState;
        }

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
                },
                userApiStatus: {
                    busy: false,
                    error: false,
                    success: false
                },
                airtableApiStatus: {
                    busy: false,
                    error: false,
                    success: false
                }
            }
        }

        case DELETE_API_CONFIG: {
            return {
                ...state
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
            headers[index][type] = value;

            const apiConfig = state.apiConfig;
            apiConfig.headers = [...headers];

            return {
                ...state,
                apiConfig: {
                    ...apiConfig
                }
            }
        }

        case USER_API_STATUS_START: {
            const userApiStatus = {
                ...state.userApiStatus
            }
            userApiStatus.busy = true;
            userApiStatus.success = false;
            userApiStatus.error = null;

            return {
                ...state,
                userApiStatus
            }
        }
        case USER_API_STATUS_SUCCESS: {
            const userApiStatus = {
                ...state.userApiStatus
            }
            userApiStatus.busy = false;
            userApiStatus.success = true;
            userApiStatus.error = null;

       return {
                ...state,
                userApiStatus
            }
        }
        case USER_API_STATUS_ERROR: {
            const userApiStatus = {
                ...state.userApiStatus
            }
            userApiStatus.busy = false;
            userApiStatus.success = false;
            userApiStatus.error = _get(action, 'payload.error');

            return {
                ...state,
                userApiStatus
            }
        }

        case AIRTABLE_API_STATUS_RESET: {
            const airtableApiStatus = {
                ...state.airtableApiStatus
            }
            airtableApiStatus.busy = false;
            airtableApiStatus.success = false;
            airtableApiStatus.error = null;

            return {
                ...state,
                airtableApiStatus
            }
        }

        case AIRTABLE_API_STATUS_START: {
            const airtableApiStatus = {
                ...state.airtableApiStatus
            }
            airtableApiStatus.busy = true;
            airtableApiStatus.success = false;
            airtableApiStatus.error = null;

            return {
                ...state,
                airtableApiStatus
            }
        }
        case AIRTABLE_API_STATUS_SUCCESS: {
            const airtableApiStatus = {
                ...state.airtableApiStatus
            }
            airtableApiStatus.busy = false;
            airtableApiStatus.success = true;
            airtableApiStatus.error = null;

            return {
                ...state,
                airtableApiStatus
            }
        }
        case AIRTABLE_API_STATUS_ERROR: {
            const airtableApiStatus = {
                ...state.airtableApiStatus
            }
            airtableApiStatus.busy = false;
            airtableApiStatus.success = false;
            airtableApiStatus.error = _get(action, 'payload.error');;

            return {
                ...state,
                airtableApiStatus
            }
        }

        default: return state;
    }
}
