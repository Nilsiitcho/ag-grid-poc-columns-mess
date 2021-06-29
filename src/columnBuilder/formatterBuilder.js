export function round(num, decimals = 0) {
    if (!num) {
        num = "0";
    }
    const number = (Math.round(num * 100) / 100).toFixed(decimals);
    return new Intl.NumberFormat("de-DE").format(number);
}

export function buildFormatter(col) {
    if (isNumeric(col)) {
        return numericFormatter;
    } else {
        return null;
    }

    function numericFormatter(params) {
        return `${round(params.value, getDecimals())}${getSuffix()}`;

        function getDecimals() {
            if (col.decimal){
                return col.decimal;
            }
            if (col.isPercent || params.data?.isPercent) {
                return (params.value > -1 && params.value < 1) ? 1 : 0;
            } else {
                return 0;
            }
        }

        function getSuffix() {
            return (col.isPercent || params.data?.isPercent) ? '%' : '';
        }
    }

    function isNumeric(col) {
        return !col.isDate && !col.isCheck && !col.isTag
            && !col.isLabel && !col.isComboBox && !col.isActions;
    }
}
