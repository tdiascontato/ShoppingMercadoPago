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
    width: 100px;
`;
export const HThree = styled.h3`
    width: 100px;
`;
export const Pe = styled.p`
    font-size: large;
    color:white;
`;
export const Button = styled.button`
    border-radius: 20px;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    text-decoration: none;
    background-color: hsla(189, 85%, 28%, 1);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.0125),
    0 1px 1px rgba(0, 0, 0, 0.05);
    border-bottom-width: 0.5rem;

    &:hover {
    background-color: hsla(189, 85%, 32%, 1);
    }

    &:active {
    border-bottom-width: 0.1rem;
    border-top-width: 0.5rem;
    }
`;