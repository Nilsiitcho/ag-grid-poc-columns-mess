function variationCalcColumn(params) {
    if (params?.data && params?.colDef) {
        const { extraInfoDivision, extraInfoDivisionBy } = params.colDef;
        const data = params.data;
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

function divisionCalcColumn(params) {
    if (params?.data && params?.colDef) {
        const { extraInfoDivision, extraInfoDivisionBy } = params.colDef;
        const data = params.data;
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

function cagrCalcColumn(params) {
    if (params?.data && params?.colDef) {
        const {
            extraInfoDivision,
            extraInfoDivisionBy,
            extraInfoDivisionSecundary,
            extraInfoDivisionBySecundary,
        } = params.colDef;
        const data = params.data;
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

export function buildValueGetter(col) {
    if (col.aggFunc === 'variation') {
        return params => variationCalcColumn(params, col);
    }
    if (col.aggFunc === 'division') {
        return divisionCalcColumn;
    }
    if (col.aggFunc === 'cagr') {
        return cagrCalcColumn;
    }
    return col.valueGetter;
}
