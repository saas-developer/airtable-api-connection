import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TablePickerSynced } from "@airtable/blocks/ui";
import Form from 'react-bootstrap/Form';

export default function TableToSaveApiData() {

    return (
        <div className="">
            <Form>
              <Form.Group controlId="apiForm.ControlInput1">
                <Form.Label>Which table to save data</Form.Label>
                <TablePickerSynced
                    globalConfigKey={["apiConfig", "tableToSaveApiData"]}
                    width="320px"
                />
                </Form.Group>
            </Form>
        </div>
    )
}
