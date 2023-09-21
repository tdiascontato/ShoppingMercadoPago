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
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Titleh1 = styled.h1`
  font-size: 4rem;
  margin-bottom: 2rem;
  color: black;
`;

export const Label = styled.label`
  display: block;
  font-size: 16px;
  margin-bottom: 8px;
  color: #555; /* Cor das etiquetas */
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 16px;
  border: 1px solid #ccc; /* Cor da borda do campo de entrada */
  border-radius: 4px;
  outline: none;

  &:focus {
    border-color: #007bff; /* Cor da borda ao receber foco */
  }
`;

export const Button = styled.button`
  background-color: #007bff; /* Cor do botão */
  color: #fff; /* Cor do texto do botão */
  padding: 12px 24px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3; /* Cor do botão ao passar o mouse */
  }
`;
