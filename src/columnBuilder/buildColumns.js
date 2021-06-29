import { buildFilterParams } from './filterBuilder';
import { buildAlign } from './alignBuilder';
import { styleBuilder } from './styleBuilder';
import { buildCellEditorParams } from './cellEditorParamsBuilder';
import { buildRenderer } from './renderedBuilder';
import { buildEditor } from './editorBuilder';
import { buildFormatter } from './formatterBuilder';
import { buildAllowedAggFuncs } from './allowedAggFuncsBuilder';
import { buildAggFunc } from './addFuncBuilder';
import { buildValueGetter } from './valueGetterBuilder';

export function buildColumns({
                                   rawCols,
                                   buildSaveBody,
                                   save,
                                   onUpdate,
                                   editOptions = {},
                                   companyId,
                               }) {
    const columns = [];

    if (rawCols && rawCols.length > 0) {
        rawCols.map(col => columns.push(buildColumn(col)));
    }

    return columns;

    function buildColumn(col) {
        return {
            headerName: col.name,
            field: col.field,
            key: col.field,
            maxWidth: buildMaxWidth(col),
            type: buildAlign(col),
            valueParser: numberParser,
            valueFormatter: buildFormatter(col),
            cellStyle: (params) => styleBuilder(params, col),
            rowGroup: col.rowGroup,
            enableRowGroup: col.enableRowGroup,
            enableValue: col.enableValue,
            allowedAggFuncs: buildAllowedAggFuncs(col),
            aggFunc: buildAggFunc(col),
            enablePivot: col.enablePivot,
            pivot: col.pivot,
            hide: col.hide,
            initialHide: col.initialHide,
            checkboxSelection: col.checkboxSelection,
            headerCheckboxSelection: col.headerCheckboxSelection,
            /* Parametros que configuram filtros */
            sortable: buildSortable(col),
            filter: buildFilterable(col),
            filterParams: buildFilterParams(col, companyId),
            floatingFilter: buildFloatingFilter(col),
            /* Parametros que configuram exibicao e edicao da celula */
            cellEditor: buildEditor(col, editOptions),
            cellEditorParams: buildCellEditorParams(col, editOptions),
            cellRenderer: buildRenderer(col, editOptions),
            valueGetter: buildValueGetter(col),
            editable: (params) => isEditable(params, col),
            onCellValueChanged: async (params) => onInputChanged(params, col),
            /* INFORMACOES EXTRAS - usadas para calculos e filtros */
            extraInfoDivision: col.division,
            extraInfoDivisionSecundary: col.divisionSecundary,
            extraInfoDivisionBy: col.divisionBy,
            extraInfoDivisionBySecundary: col.divisionBySecundary,
        };
    }

    function buildMaxWidth(col) {

        if (col.isActions || col.isCheck) {
            return 100;
        }

        if (col.isTag) {
            return 130;
        }

        return null;
    }

    function buildFilterable(col) {

        if (col.filter) {
            return col.filter;
        }

        if (col.isFilterable !== false) {
            return 'agMultiColumnFilter';
        }

        return null;
    }

    function buildFloatingFilter(col) {
        return col.isFilterable !== false;
    }

    function buildSortable(col) {
        return col.isSortable !== false;
    }

    function isEditable(params, col) {
        if (params.node && params.node.rowPinned) {
            return false;
        }

        return params.data.isEditable !== false && (col.isEditable || col.isComboBox || col.isCheck);
    }

    function numberParser(params) {
        return Number(params.newValue);
    }

    async function onInputChanged(params, col) {
        const saveCommand = buildCommand(save, 'save', 'SAVE não configurado');
        const buildBodyCommand = buildCommand(buildSaveBody, 'buildSaveBody', 'BUILD_BODY não configurado');
        const onUpdateCommand = buildCommand(onUpdate, 'onUpdate', 'ON_UPDATE não configurado');

        await saveCommand(buildBodyCommand(params.newValue, col, params.data));
        await onUpdateCommand();

        function buildCommand(command, commandName, commandNotSetMessage) {
            if (editOptions.hasOwnProperty(col.field) && editOptions[col.field][commandName]) {
                return editOptions[col.field][commandName];
            }

            return command ? command : () => console.log(commandNotSetMessage);
        }
    }
}
