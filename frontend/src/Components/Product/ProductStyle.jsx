import styled from 'styled-components';

export const Container = styled.div`
    margin: 5vh auto;
`;

export const CardProduct = styled.div`
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    margin: 5vh auto;

    img {
        margin-top: 40px;
        width: 250px;
        height: 250px;
    }

    button {
    border: none;
    outline: 0;
    padding: 10px;
    color: white;
    background-color: #1bcb7f;
    text-align: center;
    cursor: pointer;
    width: 100%;
    font-size: 15px;

    &:hover {
        opacity: 0.7;
        } 
    }
`;

export const CardCreate = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
    margin: 5vh auto;
    font-size: large;
    background-color: beige;
    width: 50%;
    border-radius: 20px;
    input, button{
        margin: 0.5vh auto;
    }
`;
