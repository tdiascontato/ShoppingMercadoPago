import styled from "styled-components";

export const Container = styled.nav`
    display: grid;
    grid-template-columns: 4fr 1fr;
    padding: 2% 10%;
    background-color: white;
`;
export const Logo = styled.h1`
    font-size: larger;
    text-align: left;
    font-weight: bold;
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
export const Side = styled.aside`
    display: flex;
    justify-content: right;
`;