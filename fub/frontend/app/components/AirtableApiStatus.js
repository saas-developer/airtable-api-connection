import React from 'react';
import _get from 'lodash/get';

export default function AirtableApiStatus({ airtableApiStatus }) {
    return (
        <>
            {
               _get(airtableApiStatus, 'busy') && <div>Saving data to Airtable</div>
            }
            {
               _get(airtableApiStatus, 'success') && <div>Successfully saved data to Airtable</div>
            }
            {
               _get(airtableApiStatus, 'error') &&
               <div>
                 <div>Error in saving data to Airtable</div>
                 <pre>{JSON.stringify(_get(airtableApiStatus, 'error'), null, 4)}</pre>
               </div>
            }
        </>
    )
}