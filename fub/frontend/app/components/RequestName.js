import React, { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { setRequestName } from '../actionsApp';

export default function RequestName() {
    const dispatch = useDispatch();
    const apiConfig = useSelector((state) => {
        return state.app.apiConfig
    })
    const handleNameChange = (event) => {
        dispatch(setRequestName(event.target.value))
    }

    return (
        <div className="api-url">
            <Form>
              <Form.Group controlId="apiForm.ControlInput1">
                <Form.Label>Name for the saved request</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Users Api"
                    onChange={handleNameChange}
                    value={apiConfig.requestName}
                />
              </Form.Group>
            </Form>
        </div>
    )
}
