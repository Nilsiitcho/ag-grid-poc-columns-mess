import React, {useState} from 'react';
import {AppBody, Button, Header, HeaderText, ButtonDiv, ClearButton, ButtonSecondary} from "./styles";
import {getMockedData} from "./dataService";
import TableAG from "./TableAGGrid/TableAG";

const App = () => {
    const [data, setData] = useState({});
    const [isDataLoading, setLoading] = useState(false);

    async function getData(primary) {
        const options = {
            setData,
            setLoading,
            primary
        }
        await getMockedData(options);
    }

    return (
        <AppBody>
            <Header>
                <HeaderText>Teste de Deploy</HeaderText>

                <ButtonDiv>
                    <ClearButton onClick={() => setData({})} show={!!data.columns}>Limpar</ClearButton>
                    <ButtonSecondary onClick={() => getData(false)}>Preencher</ButtonSecondary>
                    <Button onClick={() => getData(true)}>Preencher</Button>
                </ButtonDiv>
            </Header>

            <br/>
            <TableAG data={data} loading={isDataLoading} height={"250px"} totalFooter/>
        </AppBody>
    );
}

export default App;

