import React, {useState} from 'react';
import {AppBody, Button, Header, HeaderText, ButtonDiv, ClearButton} from "./styles";
import {getMockedData} from "./dataService";
import TableAG from "./TableAGGrid/TableAG";

const App = () => {
    const [data, setData] = useState({});
    const [isDataLoading, setLoading] = useState(false);

    async function getData() {
        const options = {
            setData,
            setLoading
        }
        await getMockedData(options);
    }


    return (
        <AppBody>
            <Header>
                <HeaderText>Teste de Deploy</HeaderText>

                <ButtonDiv>
                    <ClearButton onClick={() => setData({})} show={!!data.columns}>Limpar</ClearButton>
                    <Button onClick={getData}>Preencher</Button>
                </ButtonDiv>
            </Header>

            <br/>
            <TableAG data={data} loading={isDataLoading} height={"250px"} totalFooter/>
        </AppBody>
    );
}

export default App;

