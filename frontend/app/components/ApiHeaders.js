import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col'
import { useDispatch, useSelector } from 'react-redux';
import { setApiUrl, setApiHeader } from '../actionsApp';
import _map from 'lodash/map';

export default function ApiHeader() {
    const dispatch = useDispatch();
    const apiConfig = useSelector((state) => {
        return state.app.apiConfig
    });
    const [newHeaderValue, setNewHeaderValue] = useState('');
    const handleHeaderChange = (event, index, type) => {
        dispatch(setApiHeader({
            value: event.target.value,
            index,
            type,
        }, apiConfig.headers))
    }

    const saveHeader = () => {
        dispatch(addHeader(newHeaderKey, newHeaderValue));
    }

    const headers = apiConfig.headers || [];

    return (
        <div className="api-url">
            <Form.Label>Api Header</Form.Label>
            {
                _map(headers, (header, index) => {
                    return (
                        <Form.Row key={index}>
                                <Form.Group key={`${index}-0}`} as={Col} controlId="formGridEmail">
                                    <Form.Control
                                        type="text"
                                        placeholder="https://www.google.com"
                                        onChange={(value) => handleHeaderChange(value, index, 'key')}
                                        value={header.key}
                                    />
                                </Form.Group>

                                <Form.Group key={`${index}-1}`} as={Col} controlId="formGridEmail">
                                    <Form.Control
                                        type="text"
                                        placeholder="https://www.google.com"
                                        onChange={(value) => handleHeaderChange(value, index, 'value')}
                                        value={header.value}
                                    />
                                </Form.Group>
                        </Form.Row>
                    )
                })
            }
            <Form.Row key={headers.length}>
                <Form.Group key={`${headers.length}-0}`} as={Col} controlId="formGridEmail">
                    <Form.Control
                        type="text"
                        placeholder="https://www.google.com"
                        onChange={(value) => handleHeaderChange(value, headers.length, 'key')}
                        value={''}
                    />
                </Form.Group>
                <Form.Group key={`${headers.length}-1}`} as={Col} controlId="formGridEmail">
                    <Form.Control
                        type="text"
                        placeholder="https://www.google.com"
                        onChange={(value) => handleHeaderChange(value, headers.length, 'value')}
                        value={''}
                    />
                </Form.Group>
            </Form.Row>
        </div>
    )
}
