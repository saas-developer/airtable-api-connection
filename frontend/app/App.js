import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBusy } from './actionsApp';
import ApiUrl from './components/ApiUrl';
import ApiHeader from './components/ApiHeaders';

export default function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setBusy());
    })
    return (
        <div className="container app-container">
            <ApiUrl />
            <ApiHeader />
        </div>
    )
}
