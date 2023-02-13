import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchData, initialize } from './actionsApp';
import ApiUrl from './components/ApiUrl';
import ApiHeader from './components/ApiHeaders';
import TableToSaveApiData from './components/TableToSaveApiData';
import Button from 'react-bootstrap/Button';
import ApiConfig from './components/ApiConfig';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import SavedRequests from './components/savedRequests/SavedRequests';

export default function App() {
    const [activeTab, setActiveTab] = useState('requests');
    const dispatch = useDispatch()
    const getData = () => {
        dispatch(fetchData());
    }

    useEffect(() => {
        dispatch(initialize())
    }, [])

    return (
        <div className="container app-container">
            <h2 className="title">Api Connection</h2>
            <hr></hr>
            <Tabs
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
            >
                <Tab
                    eventKey="requests"
                    title="Requests"
                >
                    <SavedRequests
                        setActiveTab={setActiveTab}
                    />
                </Tab>
                <Tab
                    eventKey="api"
                    title="Api"
                >
                    <ApiConfig />
                </Tab>
                <Tab
                    eventKey="contact"
                    title="Contact"
                >
                    You can reach me at thepagemonk AT gmail DOT com
                </Tab>
            </Tabs>
        </div>
    )
}
