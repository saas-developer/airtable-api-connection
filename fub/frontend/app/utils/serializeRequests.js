import { globalConfig } from '@airtable/blocks';
import { v4 as uuidv4 } from 'uuid';
import _head from 'lodash/head';
import _findIndex from 'lodash/findIndex';
import _set from 'lodash/set';

export function getFirstRequest() {
    const savedRequests = globalConfig.get(['savedRequests']) || [];
    console.log('savedRequests', savedRequests);
    return _head(savedRequests)
}

export function getRequests() {
    const savedRequests = globalConfig.get(['savedRequests']) || [];
    return savedRequests;
}

export function saveRequestSync(apiConfig) {

    let uuid = apiConfig.uuid;
    if (!uuid) {
        apiConfig.uuid = uuidv4();
        uuid = apiConfig.uuid;
    }
    apiConfig.requestName = apiConfig.requestName || apiConfig.uuid;

    const savedRequests = globalConfig.get(['savedRequests']) || [];

    const index = _findIndex(savedRequests, (request) => {
        return request.uuid === uuid;
    });

    if (index != -1) {
        // Update existing config
        savedRequests[index] = apiConfig;
        globalConfig.setAsync(['savedRequests'], savedRequests);

        return 'updated';
    } else {
        // Add to configs
        savedRequests.push(apiConfig);
        globalConfig.setAsync(['savedRequests'], savedRequests);

        return 'saved';
    }   
}

export function deleteRequestSync(apiConfig) {
    let uuid = apiConfig.uuid;
    const savedRequests = globalConfig.get(['savedRequests']) || [];
    const index = _findIndex(savedRequests, (request) => {
        return request.uuid === uuid;
    });

    savedRequests.splice(index, 1);
    globalConfig.setAsync(['savedRequests'], savedRequests);
    return 'deleted';
}
