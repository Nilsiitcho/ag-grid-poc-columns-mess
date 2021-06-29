import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {LicenseManager} from 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const agGridLicense = 'CompanyName=CROPLAND,LicensedGroup=Cropland,LicenseType=MultipleApplications,LicensedConcurrentDeveloperCount=1,LicensedProductionInstancesCount=1,AssetReference=AG-016521,ExpiryDate=15_June_2022_[v2]_MTY1NTI0NzYwMDAwMA==a2408a3e80d1e62fc6a847821ffef8e4';
LicenseManager.setLicenseKey(agGridLicense);

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);

