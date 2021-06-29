export function buildFilterParams(col, companyId) {
    if (col.isLabel || col.isComboBox || col.isTag) {
        return {
            filters: [
                { filter: 'agTextColumnFilter' },
                { filter: 'agSetColumnFilter' },
            ],
        };
    }

    if (col.isDate) {
        return buildDateFilter();
    }

    return {
        filters: [
            { filter: 'agNumberColumnFilter' }
        ],
    };
}

function buildDateFilter() {
    return {
        filters: [
            {
                filter: 'agDateColumnFilter',
                filterParams: {
                    comparator: function(filterDate, cellValue) {
                        if (cellValue == null) return -1;
                        return getDate(cellValue) - filterDate;
                    },
                },
            },
            {
                filter: 'agSetColumnFilter',
                filterParams: {
                    comparator: function(a, b) {
                        return getDate(a) - getDate(b);
                    },
                },
            },
        ],
    };

    function getDate(value) {
        const dateParts = value.split('/');
        return new Date(
            Number(dateParts[2]),
            Number(dateParts[1]) - 1,
            Number(dateParts[0]),
        );
    }
}

