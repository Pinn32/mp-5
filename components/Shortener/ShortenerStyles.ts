import styled from "styled-components";

export const StyledSection = styled.section`
    background-color: var(--dark-green);
    color: var(--color);
    margin: 0 auto;
    width: 75vw;
    padding: 1rem 1.5rem 2rem;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    font-size: 1rem;
    
    & label {
        font-size: 1.2rem;
    }
    
    @media screen and (max-width: 800px) {
        width: 90vw;
    }
`;

export const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

export const StyledInput = styled.input`
    display: block;
    box-sizing: border-box;
    border-radius: 4px;
    border: none;
    width: 100%;
    height: 1.5rem;
    padding: 0 0.5rem;
    color: saddlebrown;
    font-size: 0.8rem;
    
    &:focus {
        outline-color: var(--dark-green);
    }
    
    &::placeholder {
        color: #9ec1ab;
    }

    @media screen and (max-width: 800px) {
        height: 1.8rem;
        font-size: 0.9rem;
    }
`;

export const StyledSlugDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    min-width: 0;
    
    & p {
        color: var(--light-green);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        min-width: 0;
        flex-shrink: 1;
    }
    
    @media screen and (max-width: 800px) {
        flex-direction: column;
        align-items: stretch;
    }
`;

export const StyledFlexInput = styled(StyledInput)`
    flex: 1;
    height: 1.5rem;
    width: auto;
    min-width: 0;
    border-radius: 4px;
    border: none;
    font-size: 0.8rem;
    
    &:focus {
        outline-color: var(--dark-green);
    }
    
    @media screen and (max-width: 800px) {
        flex: initial;
        height: 1.8rem;
        font-size: 0.9rem;
    }
`;

export const StyledButton = styled.button`
    box-sizing: border-box;
    height: 1.5rem;
    padding: 0 0.75rem;
    font-size: 0.8rem;
    white-space: nowrap;
    background-color: var(--color);
    color: var(--dark-green);
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background-color: var(--light-green);
    }
    &:active {
        background-color: seagreen;
    }
    @media screen and (max-width: 800px) {
        height: 1.8rem;
        font-size: 1rem;
    }
`;
