import { globalConfig } from '@airtable/blocks';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _map from 'lodash/map';
import _chunk from 'lodash/chunk';
import _keys from 'lodash/keys';
import { base } from '@airtable/blocks';

export const APP_BUSY = 'APP_BUSY';
export const SET_API_URL = 'SET_API_URL';
export const SET_API_HEADER = 'SET_API_HEADER';
export const SET_DATA_PATH = 'SET_DATA_PATH';

export function setBusy(payload) {
    return {
        type: APP_BUSY,
        payload
    }
}

export function setApiUrl(payload) {
    const url = payload;
    globalConfig.setAsync(['apiConfig', 'url'], url)

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

export function setDataPath(payload) {
    const dataPath = payload;
    globalConfig.setAsync(['apiConfig', 'dataPath'], dataPath)

    return {
        type: SET_DATA_PATH,
        payload
    }
}

export function fetchData() {
    return (dispatch, getState) => {
        const apiConfig = getState().app.apiConfig;
        const {
            url,
            headers,
            dataPath
        } = apiConfig;

        fetch('https://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y')
        .then((results) => {
            console.log('results', results);
            return results.json();
        })
        .then((resultsJson) => {
            console.log('resultsJson', resultsJson);
            if (dataPath) {
                saveDataToTable(_get(resultsJson, dataPath))
            } else {
                saveDataToTable(resultsJson)
            }
            return resultsJson;
        })
        .catch((error) => {
            console.log('error ', error);
        });
    }
}

export async function saveDataToTable(data) {
    const tableId = globalConfig.get(['apiConfig', 'tableToSaveApiData'])
    if (_isEmpty(tableId) || _isEmpty(data)) {
        return;
    }
    const table = base.getTableById(tableId);
    if (_isEmpty(table)) {
        return;
    }

    let dataToSave = data;

    if (!Array.isArray(data)) {
        dataToSave = [data];
    }

    const chunkedData = _chunk(dataToSave, 50);

    for (let i = 0; i < chunkedData.length; i++) {
        const chunk = chunkedData[i];
        await table.createRecordsAsync(chunk);
    }
}



