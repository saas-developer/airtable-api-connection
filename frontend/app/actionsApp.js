import { globalConfig } from '@airtable/blocks';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _map from 'lodash/map';
import _chunk from 'lodash/chunk';
import _keys from 'lodash/keys';
import { base } from '@airtable/blocks';
import { FieldType } from '@airtable/blocks/models';
import { parseJSONObject_ } from './utils/importJSONGoogleAppScript';
import { saveRequestSync as saveRequestToGlobalConfigSync } from './utils/serializeRequests';

export const APP_BUSY = 'APP_BUSY';
export const SET_API_URL = 'SET_API_URL';
export const SET_API_HEADER = 'SET_API_HEADER';
export const SET_DATA_PATH = 'SET_DATA_PATH';
export const SAVE_REQUEST = 'SAVE_REQUEST';
export const SET_NAME_FOR_REQUEST = 'SET_NAME_FOR_REQUEST';
export const SET_API_CONFIG = 'SET_API_CONFIG';
export const SET_TABLE_TO_SAVE_API_DATA = 'SET_TABLE_TO_SAVE_API_DATA';

window.gc = globalConfig;

export function setBusy(payload) {
    return {
        type: APP_BUSY,
        payload
    }
}

export function setApiConfig(payload) {
    if (_isEmpty(payload)) {
        payload = {
            url: '',
            headers: [],
            requestName: ''
        }
    }
    return {
        type: SET_API_CONFIG,
        payload
    }
}

export function setApiUrl(payload) {
    const url = payload;
    // globalConfig.setAsync(['apiConfig', 'url'], url)

    return {
        type: SET_API_URL,
        payload
    }   
}

export function setApiHeader(payload) {
    return {
        type: SET_API_HEADER,
        payload
    }
}

export function setRequestName(payload) {
    return {
        type: SET_NAME_FOR_REQUEST,
        payload
    }
}

export function setTableToSaveApiData(payload) {
    return {
        type: SET_TABLE_TO_SAVE_API_DATA,
        payload
    }
}

export function saveRequest() {
    return (dispatch, getState) => {
        const apiConfig = getState().app.apiConfig;

        console.log('apiConfig', apiConfig);

        saveRequestToGlobalConfigSync(apiConfig);

        return {
            type: SAVE_REQUEST
        }

    }
}

export function fetchData() {
    return (dispatch, getState) => {
        const apiConfig = getState().app.apiConfig;
        const {
            url,
            headers,
            tableToSaveApiData
        } = apiConfig;

        return fetch(url)
            .then((response) => {
                if (!response.ok) {
                    if (isJson(response)) {
                        return response.json().then(err => {throw err});
                    } else {
                        throw new Error({
                            message: 'Response is not json',
                            error: response
                        })
                    }
                }
                console.log('response', response);
                return response.json();
            })
            .then((resultsJson) => {
                console.log('resultsJson', resultsJson);

                const parsedJson = parseJSONObject_(resultsJson)
                console.log('parsedJson', parsedJson);
                const formattedRecords = transformDataToAirtableRecordFormat(parsedJson);
                saveDataToTable(formattedRecords, tableToSaveApiData);

                return resultsJson;
            })
            .catch((error) => {
                console.log('error ', error);
                throw error;
            });
    }
}

export function transformDataToAirtableRecordFormat(parsedJson) {
    if (_isEmpty(parsedJson)) {
        return [];
    }

    if (parsedJson.length < 2) {
        return [];
    }

    let headers = parsedJson[0];
    let values = parsedJson.slice(1);
    let records = [];

    for (let i = 0; i < values.length; i++) {
        let value = values[i];
        let record = {};
        for (let j = 0; j < value.length; j++) {
            let fieldValue = value[j];
            if (isPrimitive(fieldValue)) {
                fieldValue = fieldValue.toString();
            }
            record[headers[j]] = fieldValue;
        }
        records.push(record);
    }

    return {
        headers,
        records
    };

}

function isPrimitive(test) {
    return (test !== Object(test));
};

export async function saveDataToTable(formattedRecords, tableToSaveApiData) {
    const {
        headers,
        records
    } = formattedRecords;

    if (!tableToSaveApiData) {
        return;
    }

    const table = base.getTableById(tableToSaveApiData);
    if (_isEmpty(table)) {
        return;
    }


    for (let i = 0; i < headers.length; i++) {
        const fieldName = headers[i];
        const field = table.getFieldByNameIfExists(fieldName)
        if (!field) {
            await table.unstable_createFieldAsync(fieldName, FieldType.SINGLE_LINE_TEXT);
        }
    }

    let dataToSave = records;

    // if (!Array.isArray(data)) {
    //     dataToSave = [data];
    // }

    const chunkedData = _chunk(dataToSave, 50);

    for (let i = 0; i < chunkedData.length; i++) {
        const chunk = chunkedData[i];
        await table.createRecordsAsync(chunk);
    }
}

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

