export function styleBuilder(params, col) {

    if (params.node.footer || params.node.rowPinned) {
        return null;
    }

    if (col.isEditable || col.isComboBox) {
        return { backgroundColor: '#f1f3f7' };
    }

    if (col.isTrackLight || params?.data?.isTrackLight) {
        return trackLightStyleBuilder(col, params);
    }

    if (col.isTag) {
        return { backgroundColor: params.data.tagColor };
    }

    if (col.isMultiTag) {
        return { backgroundColor: params.data[`tagColor_${col.field}`] };
    }

    return null;

    function trackLightStyleBuilder(col, params) {
        if (col.aggFunc === 'division' || params?.data?.aggFunc === 'division'){
            if (params.value <= 0) {
                return { backgroundColor: '#e8e8e8' };
            }

            if (params.value >= 1 && params.value <= 20) {
                return { backgroundColor: '#F1C4DC' };
            }

            if (params.value > 20 && params.value <= 25) {
                return { backgroundColor: '#fcdb9f' };
            }

            if (params.value > 25) {
                return { backgroundColor: '#D5F4E9' };
            }
            return { backgroundColor: '#FFF' };
        } else {
            if (params.value >= 0.1) {
                return { backgroundColor: '#D5F4E9' };
            }

            if (params.value < -0.1) {
                return { backgroundColor: '#F1C4DC' };
            }
            return { backgroundColor: '#FFF' };
        }
    }
}
