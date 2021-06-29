import mockData from "./mockData";
import {buildColumns} from "./columnBuilder/buildColumns";

export async function getMockedData({setData, setLoading}) {
    try {
        setLoading(true);
        const data = await getServerData();
        setData(data);
    } catch (e) {
        console.error("Falha ao buscar dados: ");
        console.error(e);
    } finally {
        setLoading(false);
    }

    async function getServerData() {
        await sleep(1000);
        const {data} = mockData;
        const {columns, result} = data;

        return {
            columns: buildColumns(buildOptions()),
            data: result ? result : [],
        };

        function buildOptions() {
            return {
                rawCols: columns,
            };
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
