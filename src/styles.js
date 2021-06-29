import styled from "styled-components";

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderText = styled.span`
  font-size: 24px;
  font-weight: 500;
  color: #212121;
`;

export const AppBody = styled.div`
  width: 80%;
  margin: 0 auto;
`;

export const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.button`
  padding: 10px;
  border-radius: 5px;
  background: #3AA335;
  color: white;
  font-weight: bold;
  border: 1px solid #3AA335;
  cursor: pointer;
  transition: all ease-in-out 0.4s;

  &:hover {
    background: #1d6d19;
  }
`;

export const ClearButton = styled(Button)`
  display: ${({show}) => show ? 'block' : 'none'};
  margin-right: 5px;
  border-color: #e74c3c;
  background: #e74c3c;

  &:hover {
    background: #c0392b;
  }
`;
