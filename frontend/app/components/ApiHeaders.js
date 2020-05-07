import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setApiUrl, addHeader } from '../actionsApp';
import _map from 'lodash/map';

export default function ApiHeader() {
    const dispatch = useDispatch();
    const apiConfig = useSelector((state) => {
        return state.app.apiConfig
    });
    const [newHeaderKey, setNewHeaderKey] = useState('');
    const [newHeaderValue, setNewHeaderValue] = useState('');
    const handleUrlChange = (event) => {
        dispatch(setApiUrl(event.target.value))
    }

    const saveHeader = () => {
        dispatch(addHeader(newHeaderKey, newHeaderValue));
    }

    const headers = apiConfig.headers || [];

    return (
        <div className="api-url">
            <Form>
              <Form.Group controlId="apiForm.ControlInput1">
                <Form.Label>Api Header</Form.Label>
                    {
                        _map(headers, (header) => {
                            return (
                                <div>
                                    <Form.Control
                                        type="text"
                                        placeholder="https://www.google.com"
                                        onChange={handleUrlChange}
                                        value={header.key}
                                    />
                                    <Form.Control
                                        type="text"
                                        placeholder="https://www.google.com"
                                        onChange={handleUrlChange}
                                        value={header.value}
                                    />
                                </div>
                            )
                        })
                    }
                    <div>
                        <Form.Control
                            type="text"
                            placeholder="https://www.google.com"
                            onChange={(event) => setNewHeaderKey(event.target.value)}
                            value={newHeaderKey}
                        />
                        <Form.Control
                            type="text"
                            placeholder="https://www.google.com"
                            onChange={(event) => setNewHeaderValue(event.target.value)}
                            value={newHeaderValue}
                        />
                        <Button
                            onClick={saveHeader}
                        >
                            Save
                        </Button>
                    </div>
              </Form.Group>
            </Form>
        </div>
    )
}
