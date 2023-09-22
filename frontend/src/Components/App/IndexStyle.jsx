import styled from "styled-components";

export const AppStylus = styled.main`
    .light{
        background-color: #C0D0D0;
        color:  #13444d;
        transition: 1s ease;
    }
    .light .NavButton{
        background-color:#9c5953;
        color: white;
        transition: 0.5s ease-in-out;
        &:hover{
            background-color: #f9c065;
        }
    }
    .light .Card{
        background-color: #9c5953;
        color: white;
        transition: 1s ease;
    }
    .dark{
        background-color: #142e2b;
        color: #b6d0a0;
        transition: 1s ease;
    }
    .dark .NavButton{
        background-color: #f9c065;
        color: black;
        transition: 0.5s ease-in-out;
        &:hover{
            background-color: #9c5953;
        }
    }
    .dark .Card{
        color: black;
        background-color: #f9c065;
        transition: 1s ease;
    }
`;
export const AppLayout = styled.section`
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        font-family: 'Roboto', sans-serif; 
        
`;
export const Content = styled.div`
    flex-grow: 1;
    overflow-y: auto;
    height: auto;
`;


