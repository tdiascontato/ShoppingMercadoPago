import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  Button,
  Container,
  Titleh1,
  Input,
  Label,
  LoginContainer,
} from "./IndexStyle";

export const Cadastro = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    celular: "",
    senha: "",
    senhaRepetida: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleCadastro = async () => {
    try {
      const response = await axios.post("http://localhost:4004/cadastro", userData);
      if (response.data.success) {
        alert("Cadastro realizado com sucesso!");
        // Use window.location.href to navigate to the login page
        window.location.href = "/";
      } else {
        alert("Erro ao cadastrar. Verifique os dados e tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao cadastrar. Verifique os dados e tente novamente.");
    }
  };

  return (
    <Container>
      <LoginContainer>
        <Titleh1>Faça seu cadastro</Titleh1>
        <Label>Digite seu usuário:</Label>
        <Input
          type="text"
          name="username"
          value={userData.username}
          onChange={handleInputChange}
        />
        <Label>Digite seu email:</Label>
        <Input
          type="text"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
        />
        <Label>Digite seu celular:</Label>
        <Input
          type="text"
          name="celular"
          value={userData.celular}
          onChange={handleInputChange}
        />
        <Label>Digite sua senha:</Label>
        <Input
          type="password"
          name="senha"
          value={userData.senha}
          onChange={handleInputChange}
        />
        <Label>Repita a sua senha:</Label>
        <Input
          type="password"
          name="senhaRepetida"
          value={userData.senhaRepetida}
          onChange={handleInputChange}
        />
        <Button onClick={handleCadastro}>Cadastrar</Button>
        <Link to="/">Clique para Login!</Link>
        <Link to="/dashboard">Dashboard</Link>
      </LoginContainer>
    </Container>
  );
};
