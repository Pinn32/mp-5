import { useState } from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
    position: relative;
    background-color: var(--dark-green);
    margin: 0 auto;
    border-radius: 8px;
    width: 75vw;
    padding: 2% 3%;
    
    @media screen and (max-width: 800px) {
        width: 85vw;
    }
`;

const CopyButton = styled.button`
    position: absolute;
    top: 0.6rem;
    right: 0.75rem;
    padding: 0.2rem 0.6rem;
    font-size: 0.75rem;
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
`;

const OutputUrl = styled.p`
    color: var(--light-green);
`;

type Result =
    | { type: "success"; url: string }
    | { type: "error"; message: string };

export default function Output({ result }: { result: Result }) {
    const [copied, setCopied] = useState(false);

    async function handleCopy() {
        if (result.type !== "success") return;
        await navigator.clipboard.writeText(result.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return(
        <StyledDiv>
            {
                result.type === "success"
                    ?
                (<>
                    <CopyButton onClick={handleCopy}>{copied ? "Copied!" : "Copy"}</CopyButton>
                    <p>Your compacted URL:</p>
                    <p id={`output-url`}>{result.url}</p>
                </>)
                    :
                (<OutputUrl>{result.message}</OutputUrl>)
            }
        </StyledDiv>
    )
}