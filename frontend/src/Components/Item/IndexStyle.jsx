import styled from "styled-components";

export const Container = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10rem auto;
`;
export const CardProduct = styled.div`
    display: flex;
    margin: 10vh auto;
    gap: 5rem;
`;
export const CardItem = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem auto;
`;
export const Img = styled.img`
    width: 30vw;
    border-radius: 25%;
`;
export const HThree = styled.h3`
    font-size: xx-large;
`;
export const Pe = styled.p`
    font-size: x-large;
    .homeButton{
        padding: 0.5rem;
        text-decoration: none;
        color: white;
        background-color: black;
        border-radius: 20px;
        transition: 1s ease;
        &:hover{
            background-color: white;
            color: black;
            transition: 1s ease;
        }
    }
    `;
export const Button = styled.button`
    border-radius: 20px;
    color: white;
    font-size: x-large;
    font-weight: bold;
    text-decoration: none;
    background-color: #7dbd66;
    padding: 1rem;
    border: none;
    cursor: pointer;
    transition: 1s ease;
    &:hover{
        background-color: #5ed5d7;
        color: black;
        transition: 1s ease;
    }
`;