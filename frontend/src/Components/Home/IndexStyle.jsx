import styled from "styled-components";

export const Container = styled.span`
    display: flex;
    flex-direction: column;
`;
export const Search = styled.h3`
    display: flex;
    margin: 2rem auto;
    gap: 1vw;
    align-items: center;
`;
export const Input = styled.input`
    width: 79vw;
    height: 5vh;
    border-radius: 20px;
    border: none;
    transition: 1s ease;
    cursor: pointer;

    &:hover{
        transition: 1s ease;
        opacity: 0.8;
    }
`;
export const Go = styled.button`
    width: fit-content;
    font-size: large;
    padding: 1rem;
    border: none;
    border-radius: 25px;
    cursor: pointer;
`;
export const CardProduct = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
`;
export const CardItem = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`;
export const Img = styled.img`
    width: 25vw;
    border-radius: 25%;
`;
export const HThree = styled.h3`
    font-size: xx-large;
`;
export const Pe = styled.p`
    font-size: x-large;
`;
export const Button = styled.button`
    border-radius: 20px;
    color: white;
    font-size: x-large;
    font-weight: bold;
    text-decoration: none;
    background-color: black;
    padding: 1rem;
    border: none;
    cursor: pointer;
    transition: 1s ease;
    &:hover{
        background-color: white;
        color: black;
        transition: 1s ease;
    }
`;