import React from 'react';
import Loading from './Loading';

export default (props) => {
    return (
        <div
            className='ag-custom-loading-cell'
            style={{paddingLeft: '10px', lineHeight: '25px'}}
        >
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <span style={{marginRight: 5}}><Loading width={20} height={20}/></span>
                <span> {props.loadingMessage}</span>
            </div>
        </div>
    );
};
