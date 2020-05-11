import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getRequests } from '../../utils/serializeRequests';
import Button from 'react-bootstrap/Button';
import _map from 'lodash/map';
import _isEmpty from 'lodash/isEmpty';
import {
    setApiConfig
} from '../../actionsApp';

export default function SavedRequests({ setActiveTab }) {
    const dispatch = useDispatch();
    const savedRequests = getRequests();

    const handleCreateNewClick = () => {
        setActiveTab('api');
        dispatch(setApiConfig(null));
    }

    const handleRequestNameClick = (request) => {
        setActiveTab('api');
        dispatch(setApiConfig(request));
    }

    return (
        <div>
            { _isEmpty(savedRequests) &&
                <div>
                    <p>You do not have any saved requests.</p>
                </div>
            }


            <div>
                {
                    _map(savedRequests, (request, index) => {
                        return (
                            <div key={index}>
                                <Button
                                    onClick={() => handleRequestNameClick(request)}
                                    variant="link">{request.requestName}</Button>
                            </div>
                        )
                    })
                }
            </div>

            <div>
                <Button
                    onClick={handleCreateNewClick}
                    variant="link">Create a new request</Button>
            </div>
        </div>
    )
}
