import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchData } from './actionsApp';
import ApiUrl from './components/ApiUrl';
import ApiHeader from './components/ApiHeaders';
import TableToSaveApiData from './components/TableToSaveApiData';
import Button from 'react-bootstrap/Button';
import DataPath from './components/DataPath';

export default function App() {
    const dispatch = useDispatch()
    const getData = () => {
        dispatch(fetchData());
    }

    return (
        <div className="container app-container">
            <ApiUrl />
            <ApiHeader />
            <TableToSaveApiData />
            <DataPath />
            <Button
                type="button"
                onClick={getData}
            >Fetch Data</Button>
        </div>
    )
}
