import React from 'react';
import _get from 'lodash/get';

export default function UserApiStatus({ userApiStatus }) {
    return (
        <>
            {
               _get(userApiStatus, 'busy') && <div>Fetching data from API</div>
            }
            {
               _get(userApiStatus, 'success') && <div>Successfully fetched data from API</div>
            }
            {
               _get(userApiStatus, 'error') &&
               <div>
                 <div>Error in fetching data from API</div>
                 <pre>{JSON.stringify(_get(userApiStatus, 'error'), null, 4)}</pre>
               </div>
            }
        </>
    )
}