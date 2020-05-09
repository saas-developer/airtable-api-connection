import React, { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { setDataPath } from '../actionsApp';

export default function DataPath() {
    const dispatch = useDispatch();
    const apiConfig = useSelector((state) => {
        return state.app.apiConfig
    })
    const handleDataPathChange = (event) => {
        dispatch(setDataPath(event.target.value))
    }

    return (
        <div className="api-url">
            <Form>
              <Form.Group controlId="apiForm.ControlInput1">
                <Form.Label>Data Path</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="root.stations.station"
                    onChange={handleDataPathChange}
                    value={apiConfig.dataPath}
                />
              </Form.Group>
            </Form>
        </div>
    )
}
