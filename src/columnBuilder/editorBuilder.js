export function buildEditor(col, editOptions) {
    if (col.isComboBox || col.isCheck) {
        return 'agRichSelectCellEditor';
    }

    if (editOptions.hasOwnProperty(col.field) && editOptions[col.field]['editor']) {
        return editOptions[col.field]['editor'];
    }

    return 'agTextCellEditor';
}
