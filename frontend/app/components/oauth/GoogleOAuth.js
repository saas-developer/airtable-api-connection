import React from 'react';
import OauthPopup from './OauthPopup';
import qs from 'query-string';

const params = {
  client_id: '33412689996-edq2ehsf6ijmkhhv0b59dgmjeiqest1a.apps.googleusercontent.com',
  redirect_uri: 'https://devblock---klq-f-pod-ad-ttuy-u--zg82je4.airtableblocks.com',
  scope: 'https://www.googleapis.com/auth/analytics.readonly',
  display: 'popup',
  response_type: 'code',
  access_type:'offline'
  // ,
  // approval_prompt: 'force'
};

const url = 'https://accounts.google.com/o/oauth2/auth' + '?' + qs.stringify(params);

const onCode = (code) => console.log("wooooo a code", code);
console.log('url', url);
 
export default function GoogleOAuth() {
  return (
    <OauthPopup
      url={url}
      title="ashwin"
      onCode={onCode}
    >
      <div>Click me to open a Popup</div>
    </OauthPopup>
    );
}
