import styled from "styled-components";

export const Container = styled.nav`
    display: grid;
    grid-template-columns: 4fr 1fr;
    padding: 2% 10%;
`;
export const Side = styled.aside`
    display: flex;
    justify-content: right;
    gap: 0.75rem;
`;
export const Img = styled.img`
    width: 3rem;
`;
export const Button = styled.button`
    width: 100px;
    height: 50px;
    border-radius: 75% 5% 75% 5% / 75% 5% 75% 5%;
    border: none;
    font-size: large;
    font-weight: bolder;
    cursor: pointer;
`;