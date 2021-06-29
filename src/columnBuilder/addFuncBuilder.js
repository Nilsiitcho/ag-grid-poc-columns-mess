export function buildAggFunc(col) {
    if (col.aggFunc){
        return col.aggFunc;
    }
    if (col.enableValue) {
        return 'sum';
    }
}
