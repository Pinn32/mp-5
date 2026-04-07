import styled from "styled-components";

const StyledDiv = styled.div`
    background-color: var(--dark-green);
    margin: 0 auto;
    border-radius: 8px;
    width: 75vw;
    padding: 2% 3%;
    @media screen and (max-width: 800px) {
        width: 85vw;
    }
`;

type Result =
    | { type: "success"; url: string }
    | { type: "error"; message: string };

export default function Output({ result }: { result: Result }) {
    return(
        <StyledDiv>
            {result.type === "success"
                ? <><p>Your compacted URL:</p><p>{result.url}</p></>
                : <p>{result.message}</p>
            }
        </StyledDiv>
    )
}