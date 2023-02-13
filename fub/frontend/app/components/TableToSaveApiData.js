import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TablePicker } from "@airtable/blocks/ui";
import Form from 'react-bootstrap/Form';
import {
    setTableToSaveApiData
} from '../actionsApp';
import { base } from '@airtable/blocks';

export default function TableToSaveApiData() {
    const dispatch = useDispatch();
    const apiConfig = useSelector((state) => {
        return state.app.apiConfig
    })

    const tableId = apiConfig.tableToSaveApiData;
    const table = base.getTableByIdIfExists(tableId);
    console.log('table', table);

    const handleTableChange = (tableId) => {
        dispatch(setTableToSaveApiData(tableId))
    }

    return (
        <div className="">
            <Form>
              <Form.Group controlId="apiForm.ControlInput1">
                <Form.Label>Table to save data</Form.Label>
                <div>
                    <TablePicker
                        className="table-picker"
                        onChange={newTable => handleTableChange(newTable.id)}
                        width="320px"
                        table={table}
                    />
                </div>
                </Form.Group>
            </Form>
        </div>
    )
}
