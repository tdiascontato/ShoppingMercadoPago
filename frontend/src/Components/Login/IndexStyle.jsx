import styled from "styled-components";

export const ContainerStyle = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export const LoginContainerStyle = styled.div`
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    max-width: 400px;
    width: 100%;
`;

export  const TitleStyle = styled.h1`
    font-size: 24px;
`;

export const LabelStyle = styled.label`
    display: block;
    font-size: 16px;
    font-weight: bold;
`;

export const InputStyle = styled.input`
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

export const ButtonStyle = styled.button`
    background: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
`;

export const LinkStyle = styled.p`
    display: block;
    margin-top: 10px;
    text-decoration: none;
    color: #007bff;
`;