import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBusy } from './actionsApp';

export default function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setBusy());
    })
    return (
        <div>
            This is App.js
        </div>
    )
}
