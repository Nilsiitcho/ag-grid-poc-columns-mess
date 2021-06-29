import React, {useEffect, useState} from 'react';
import {AgGridReact} from 'ag-grid-react';
import locale from './locale';
import GridLoading from './GridLoading';
import sideBarConfig from './sideBarConfig';
import statusBarConfig from './statusBarConfig';

export default ({
                    data,
                    loading,
                    height = '100%',
                    width = '100%',
                    groupFooter,
                    totalFooter,
                    hasStatusBar,
                    hasSideBar,
                    autoHeight,
                    actionButtons,
                    enterMovesDown,
                    totalPinnedOnTop,
                    onSelectionChange,
                    onFirstDataRendered,
                    suppressRowClickSelection,
                }) => {

    const tableStyle = {
        height: height,
        width: width,
    };

    const [gridApi, setGridApi] = useState(null);

    const onGridReady = (params) => {
        setGridApi(params.api);
    };

    useEffect(() => {
        if (gridApi) {
            if (loading) {
                gridApi.showLoadingOverlay();
            } else {
                gridApi.hideOverlay();

                // if (data.data && gridApi) {
                //     gridApi.setRowData(data.data);
                // }

                if (data.data && totalPinnedOnTop) {
                    setTimeout(() => {
                        const index = gridApi.getLastDisplayedRow();
                        const {aggData} = gridApi.getDisplayedRowAtIndex(index);
                        gridApi.setPinnedTopRowData([aggData]);
                    }, 500);
                }
            }
        }
    }, [loading, gridApi]);

    // useEffect(() => {
    //     if (data.data && gridApi) {
    //         gridApi.setRowData(data.data);
    //     }
    // }, [data, gridApi]);

    function getRowStyle(params) {
        if (params.node.footer || params.node.rowPinned) {
            return {fontWeight: 'bold', backgroundColor: '#5D627B', color: '#f5f0f5'};
        }
    }

    function variationCalc(params) {
        if (params?.rowNode?.aggData && params?.colDef) {
            const {extraInfoDivision, extraInfoDivisionBy} = params.colDef;
            const data = params.rowNode.aggData;
            if ((data[extraInfoDivisionBy] === 0) && (data[extraInfoDivision] === 0)) {
                return 0;
            }
            if ((data[extraInfoDivisionBy] === 0) && (data[extraInfoDivision] !== 0)) {
                return data[extraInfoDivision];
            }
            if (data[extraInfoDivisionBy] < 0) {
                return (((data[extraInfoDivision] / data[extraInfoDivisionBy]) - 1) * 100) * -1;
            }
            return ((data[extraInfoDivision] / data[extraInfoDivisionBy]) - 1) * 100;
        }
        return 0;
    }

    function divisionCalc(params) {
        if (params?.rowNode?.aggData && params?.colDef) {
            const {extraInfoDivision, extraInfoDivisionBy} = params.colDef;
            const data = params.rowNode.aggData;
            if ((data[extraInfoDivisionBy] === 0) && (data[extraInfoDivision] === 0)) {
                return 0;
            }
            if ((data[extraInfoDivisionBy] === 0) && (data[extraInfoDivision] !== 0)) {
                return data[extraInfoDivision];
            }
            return ((data[extraInfoDivision] / data[extraInfoDivisionBy])) * 100;
        }
        return 0;
    }

    function cagrCalc(params) {
        if (params?.rowNode?.aggData && params?.colDef) {
            const {
                extraInfoDivision,
                extraInfoDivisionBy,
                extraInfoDivisionSecundary,
                extraInfoDivisionBySecundary,
            } = params.colDef;
            const data = params.rowNode.aggData;
            if (data[extraInfoDivisionBy] === 0) {
                if (data[extraInfoDivision] > 0) {
                    return data[extraInfoDivision];
                }
                return 0;
            }
            let contador1 = data[extraInfoDivision] / data[extraInfoDivisionBy];
            let contador2 = extraInfoDivisionSecundary / extraInfoDivisionBySecundary;
            let calculo = Math.pow(contador1, contador2);
            return (calculo - 1) * 100;
        }
        return 0;
    }

    return (
        <div className='ag-theme-balham' style={tableStyle}>
            <AgGridReact
                onGridReady={onGridReady}
                domLayout={autoHeight ? 'autoHeight' : 'normal'}
                localeText={locale}
                enterMovesDown={enterMovesDown}
                enterMovesDownAfterEdit
                enableCharts
                undoRedoCellEditing
                defaultColDef={{
                    flex: 1,
                    minWidth: 100,
                    filter: true,
                    sortable: true,
                    resizable: true,
                }}

                statusBar={hasStatusBar ? statusBarConfig : false}
                sideBar={hasSideBar ? sideBarConfig : false}
                rowGroupPanelShow={hasSideBar ? 'always' : false}
                enableRangeSelection={hasStatusBar}
                rowSelection={hasStatusBar ? 'multiple' : false}
                rowMultiSelectWithClick={!!hasStatusBar}
                suppressRowClickSelection={suppressRowClickSelection}
                onSelectionChanged={onSelectionChange}
                onFirstDataRendered={onFirstDataRendered}
                frameworkComponents={{
                    customLoadingOverlay: GridLoading,
                    actionButtonsRenderer: actionButtons ? actionButtons : () => 'Ação',
                }}
                aggFuncs={{
                    'variation': variationCalc,
                    'division': divisionCalc,
                    'cagr': cagrCalc,
                }}
                loadingOverlayComponent={'customLoadingOverlay'}
                loadingOverlayComponentParams={{
                    loadingMessage: 'Carregando...',
                }}
                getRowStyle={getRowStyle}
                groupIncludeFooter={groupFooter}
                groupIncludeTotalFooter={totalFooter}
                columnDefs={data.columns ? data.columns : []}
                rowData={data.data ? data.data : []}
            >
            </AgGridReact>
        </div>
    );
};
