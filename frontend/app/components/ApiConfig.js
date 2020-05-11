import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchData, saveRequest } from '../actionsApp';
import ApiUrl from './ApiUrl';
import ApiHeader from './ApiHeaders';
import TableToSaveApiData from './TableToSaveApiData';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import RequestName from './RequestName';

export default function ApiConfig() {
    const dispatch = useDispatch();
    const [error, setError] = useState(null)
    const getData = () => {
        // Clear the error
        setError(null);

        // Make the API call
        dispatch(fetchData())
            .then((results) => {
                console.log('results', results);
            })
            .catch((error) => {
                // Display error
                setError(error);
            });
    }

    const saveThisRequest = () => {
        dispatch(saveRequest())
    }

    return (
        <div className="">
            <ApiUrl />
            <ApiHeader />
            <TableToSaveApiData />
            <RequestName />
            <Button
                type="button"
                onClick={getData}
            >Fetch Data</Button>

            <Button
                type="button"
                onClick={saveThisRequest}
            >Save Data</Button>

            {
                error && <div>
                    <Alert variant="danger">{error.message}</Alert>
                </div>
            }

        </div>
    )
}
