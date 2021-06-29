export function buildCellEditorParams(col, editOptions) {
    if (editOptions.hasOwnProperty(col.field)) {
        return editOptions[col.field]['editorParams'];
    }

    if (col.isComboBox && editOptions.hasOwnProperty('comboBox')) {
        return editOptions['comboBox']['editorParams'];
    }
}
