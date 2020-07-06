import React from 'react';
import ReactDOM from 'react-dom';
// import { css } from '@emotion/core'; 
import MapEntry from './component/mapEntry';

const IndexComponent = () => {
    return (
       <div className="classInject" style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
       }}>
            <MapEntry />
       </div> 
    )
}

ReactDOM.render(
    <IndexComponent />,
    document.querySelector('#root'),
)

