import styled from 'styled-components';

export const Container = styled.div`
    margin: 5vh auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;
export const CardCreate = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 3vh;
    margin: 5vh 3vh;
    width: max-content;
    height: max-content;
    border-radius: 20px;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;
export const HTwo = styled.h2`
    font-size: xx-large;
    text-align: center;
    margin: 0 auto;
    margin-bottom: 2rem;
`;
export const HThree = styled.h3`
    font-size: xx-large;
    margin: 0 auto;
    margin-bottom: 2rem;
`;
export const Label = styled.label`
    font-size: x-large;
    margin: 1rem;
`;
export const Input = styled.input`
    width: 30vw;
    height: 5vh;
    margin: 0 auto;
    color: black;
    font-size: large;
    text-align: center;
    background-color: white;
    border: 0.01rem solid black;
    border-radius: 25px;
`;
export const Button = styled.button`
    border: none;
    outline: 0;
    width: 30vw;
    margin:2rem 0;
    padding: 1rem;
    font-size: x-large;
    text-align: center;
    background-color: black;
    color: white;
    border-radius: 25px;
    cursor: pointer;
    transition: 1s ease;
    &:hover {
        color: black;
        background: white;
        transition: 1s ease;
    } 
    &.Logout{
        background-color: #dc0e0e;
    }
    `;
export const SecondButton = styled.div`
    border: none;
    outline: 0;
    width: 10vw;
    margin:2rem 0;
    padding: 1rem;
    font-size: x-large;
    text-align: center;
    background-color: #000000;
    color: white;
    border-radius: 25px;
    cursor: pointer;
    transition: 1s ease;
    &:hover {
        color: black;
        background: white;
        transition: 1s ease;
    } 
`;
export const Img = styled.img`
    width: 150px;
    border-radius: 20px;
    display: flex;
    margin: 0 auto;
`;
export const Ul = styled.ul`
    display:grid;
    grid-template-columns: 1fr 1fr;
    gap:5rem;
    justify-content: center;
    align-items: center;
    list-style: none;
    text-align: center;
`;
export const Li = styled.li`
`;
export const Pe = styled.p`
    font-size: x-large;
    margin: 1rem;
`;
export const CardItem = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;