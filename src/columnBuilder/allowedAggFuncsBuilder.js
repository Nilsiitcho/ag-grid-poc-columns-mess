export function buildAllowedAggFuncs(col) {
    let aggFunc = ['sum', 'min', 'max', 'avg', 'count'];

    if (col.isPercent) {
        aggFunc.push('variation');
        aggFunc.push('division');
    }

    return col.enableValue ? aggFunc : [];
}
