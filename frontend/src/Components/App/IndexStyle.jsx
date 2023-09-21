import styled from "styled-components";

export const AppStylus = styled.main`
    .light{
        background-color: #C0D0D0;
        color:  #13444d;
        transition: 1s ease;
    }
    .light.Description{     
        color: #fff;    
        transition: 1s ease;
    }
    .dark{
        background-color: #142e2b;
        color: #b6d0a0;
        transition: 1s ease;
    }
    .dark.Description{
        color: #ffdc73; 
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


