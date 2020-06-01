import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import _map from 'lodash/map';
import _isEmpty from 'lodash/isEmpty';
import {
    setApiConfig,
    deleteApiConfig
} from '../../actionsApp';

export default function SavedRequests({ setActiveTab }) {
    const dispatch = useDispatch();
    const savedRequests = useSelector((state) => {
        return state.app.savedRequests
    });

    const handleCreateNewClick = () => {
        setActiveTab('api');
        dispatch(setApiConfig(null));
    }

    const handleRequestNameClick = (request) => {
        setActiveTab('api');
        dispatch(setApiConfig(request));
    }

    const handleDeleteClick = (request) => {
        dispatch(deleteApiConfig(request));
    }

    return (
        <div className="saved-requests">
            { _isEmpty(savedRequests) &&
                <div>
                    <p>You do not have any saved requests.</p>
                </div>
            }


            <div className="list">
                {
                    _map(savedRequests, (request, index) => {
                        return (
                            <div key={index} className="list-item">
                                <div>
                                    <Button
                                        className="request-name"
                                        onClick={() => handleRequestNameClick(request)}
                                        variant="link">{request.requestName}</Button>
                                </div>
                                <div>
                                    <Button
                                        variant="link"
                                        onClick={() => handleDeleteClick(request)}>Delete</Button>
                                </div>
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
