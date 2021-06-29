export function buildRenderer(col, editOptions) {
    if(col.isCheck){
        return 'checkRenderer';
    }

    if(col.isActions){
        return 'actionButtonsRenderer';
    }

    if (editOptions.hasOwnProperty(col.field)) {
        return editOptions[col.field]['renderer'];
    }

    if (col.isComboBox && editOptions.hasOwnProperty('comboBox')) {
        return editOptions['comboBox']['renderer'];
    }
}
