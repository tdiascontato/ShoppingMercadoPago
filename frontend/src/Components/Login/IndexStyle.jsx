import styled from "styled-components";

export const ContainerStyle = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10rem 0;
`;

export const LoginContainerStyle = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2rem;
    border-radius: 25px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    width: 50vw;
`; 

export  const TitleStyle = styled.h1`
    font-size: xx-large;
`;

export const LabelStyle = styled.label`
    font-size: x-large;
    font-weight: bold;
    margin: 1rem;
`;

export const InputStyle = styled.input`
    width: 30vw;
    padding: 2rem;
    margin: 1rem auto;
    border: 0.01rem solid #ccc;
    border-radius: 25px;
    text-align: center;
    font-size: x-large;
`;

export const ButtonStyle = styled.button`
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
`;

export const LinkStyle = styled.p`
    display: block;
    font-size: large;
    font-weight: bold;
    text-decoration: none;
    color: #034b99;
`;