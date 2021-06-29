export function buildAlign(col) {
    if (col.align) return col.align;

    if (col.isLabel || col.isComboBox) return 'leftAligned';

    if (col.isTag || col.isMultiTag || col.isCheck) return 'centerAligned';

    return 'rightAligned';
}
