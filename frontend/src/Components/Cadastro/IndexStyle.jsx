import styled from 'styled-components';

// Importe suas constantes ou arquivos de estilo, se necessário

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5rem auto;
`;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 50vw;
  height: max-content;
  border-radius: 25px;
  padding: 4rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Titleh1 = styled.h1`
  font-size: xx-large;
  margin-bottom: 2rem;
`;

export const Label = styled.label`
  display: block;
  font-size: x-large;
  margin-bottom: 1rem;
`;

export const Input = styled.input`
  width: 30vw;
  padding: 10px;
  font-size: x-large;
  text-align: center;
  margin-bottom: 16px;
  border: 1px solid #ccc; /* Cor da borda do campo de entrada */
  border-radius: 25px;
  outline: none;

  &:focus {
    border-color: #034b99; /* Cor da borda ao receber foco */
  }
`;

export const Button = styled.button`
  background: #034b99;
  color: #fff;
  width: 30vw;
  padding: 1.5rem 0;
  margin: 2rem auto;
  border: none;
  border-radius: 25px;
  font-size: large;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #034b99; /* Cor do botão ao passar o mouse */
  }
`;
