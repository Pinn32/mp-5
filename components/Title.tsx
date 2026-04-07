import styled from "styled-components";

const StyledTitle = styled.section`
    margin: 0 auto;
    text-align: center;
    & h1 {
        font-size: 3rem;
    }
    & h2 {
        font-size: 1.2rem;
    }
    
    @media screen and (max-width: 800px) {
        & h1 {
            font-size: 2rem;
        }
        & h2 {
            font-size: 1rem;
        }
    }
`;

export default function Title() {
    return(
        <StyledTitle id="title">
            <h1>URL Shortener</h1>
            <h2>This website helps you to compact your long URLs into shareable short links.</h2>
        </StyledTitle>
    )
}