import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
`;

export const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  margin-top: 5px;

  width: 326px;
  height: 58px;

  font-size: 20px;
  font-weight: 700;
  color: #fff;

  border-radius: 50px;
  border: none;
  background-color: #311c1c;
`;
