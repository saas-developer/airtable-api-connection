import React, { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { setApiUrl } from '../actionsApp';

export default function ApiUrl() {
    const dispatch = useDispatch();
    const apiConfig = useSelector((state) => {
        return state.app.apiConfig
    })
    const handleUrlChange = (event) => {
        dispatch(setApiUrl(event.target.value))
    }

    return (
        <div className="api-url">
            <Form>
              <Form.Group controlId="apiForm.ControlInput1">
                <Form.Label>Api URL</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="https://www.google.com"
                    onChange={handleUrlChange}
                    value={apiConfig.url}
                />
              </Form.Group>
            </Form>
        </div>
    )
}
