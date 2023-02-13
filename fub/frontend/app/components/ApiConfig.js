import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, saveRequest } from '../actionsApp';
import ApiUrl from './ApiUrl';
import ApiHeader from './ApiHeaders';
import TableToSaveApiData from './TableToSaveApiData';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import RequestName from './RequestName';
import UserApiStatus from './UserApiStatus';
import AirtableApiStatus from './AirtableApiStatus';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';

export default function ApiConfig() {
    const userApiStatus = useSelector((state) => {
        return state.app.userApiStatus
    });
    const airtableApiStatus = useSelector((state) => {
        return state.app.airtableApiStatus
    });
    const dispatch = useDispatch();
    const [error, setError] = useState(null)
    const [busy, setBusy] = useState(false);
    const getData = () => {
        // Clear the error
        setError(null);
        setBusy(true);

        // Make the API call
        dispatch(fetchData())
            .then((results) => {
                console.log('results', results);
                setBusy(false);
            })
            .catch((error) => {
                console.log('error', error);
                // Display error
                setError(error);
                setBusy(false);
            });
    }

    const saveThisRequest = () => {
        dispatch(saveRequest())
    }

    const renderError = (error) => {
        if (!error) { return null; }

        let errorMessage = _get(error, 'message');
        if (typeof error === 'string') {
            errorMessage = error;
        }

        return (
            <div>
                <Alert
                    onClose={() => setError(null)}
                    variant="danger"
                >
                    <>
                        <div>
                            {
                                !_isEmpty(errorMessage) ? errorMessage : 'An unknown error occured'
                            }
                        </div>
                        <div>
                            Does the API support CORS?
                        </div>
                    </>

                </Alert>
            </div>
        )
    }

    return (
        <div className="">
            <ApiUrl />
            <ApiHeader />
            <TableToSaveApiData />
            <RequestName />
            <UserApiStatus userApiStatus={userApiStatus}/>
            <AirtableApiStatus airtableApiStatus={airtableApiStatus} />
            
            <Button
                type="button"
                onClick={getData}
            >
                {
                    busy ? 'Fetching ...' : 'Fetch API Data'
                }
            </Button>

            <Button
                type="button"
                onClick={saveThisRequest}
                style={{ marginLeft: '10px' }}
            >Save API config</Button>

            {renderError(error)}

        </div>
    )
}
