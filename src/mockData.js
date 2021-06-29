const mockData = {
    "code": 200,
    "data": {
        "columns": [
            {
                "field": "segment_name",
                "isFilterable": false,
                "isLabel": true,
                "name": "Segmento"
            },
            {
                "enableValue": true,
                "field": "venda_sales_2020",
                "isFilterable": false,
                "name": "Vendas 2020 (R$)"
            },
            {
                "enableValue": true,
                "field": "venda_budget_2021",
                "isFilterable": false,
                "name": "Previsão 2021 (R$)"
            },
            {
                "enableValue": true,
                "field": "venda_sales_2021",
                "isFilterable": false,
                "name": "Vendas 2021 Acum. (R$)"
            },
            {
                "aggFunc": "variation",
                "division": "venda_budget_2021",
                "divisionBy": "venda_sales_2020",
                "field": "variation_field",
                "isFilterable": false,
                "isPercent": true,
                "isTrackLight": true,
                "name": "Var. (%)"
            }
        ],
        "result": [
            {
                "segment_id": 1,
                "segment_name": "FUNGICIDA",
                "var": 266.66307062371817,
                "venda_budget_2021": 183680856.49774146,
                "venda_sales_2020": 50095270.34868501,
                "venda_sales_2021": 0.0
            },
            {
                "segment_id": 8,
                "segment_name": "HERBICIDA",
                "var": -77.39499421396462,
                "venda_budget_2021": 11832926.776514554,
                "venda_sales_2020": 52346488.59866495,
                "venda_sales_2021": 0.0
            },
            {
                "segment_id": 4,
                "segment_name": "INSETICIDA",
                "var": -94.03795231251686,
                "venda_budget_2021": 3803283.5070909094,
                "venda_sales_2020": 63791564.684657075,
                "venda_sales_2021": 0.0
            },
            {
                "segment_id": 5,
                "segment_name": "TS",
                "var": -93.2246208285676,
                "venda_budget_2021": 123234.384,
                "venda_sales_2020": 1818855.9028490002,
                "venda_sales_2021": 0.0
            },
            {
                "segment_id": 6,
                "segment_name": "OUTROS",
                "var": -98.01572557843352,
                "venda_budget_2021": 49461.04,
                "venda_sales_2020": 2492651.190904999,
                "venda_sales_2021": 0.0
            },
            {
                "segment_id": 7,
                "segment_name": "SEEDS",
                "var": 0.0,
                "venda_budget_2021": 0.0,
                "venda_sales_2020": 0.0,
                "venda_sales_2021": 0.0
            }
        ]
    }
}

export default mockData;
