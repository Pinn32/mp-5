import { useState } from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
    background-color: var(--dark-green);
    margin: 0 auto;
    border-radius: 8px;
    width: 75vw;
    padding: 1rem 1.5rem 1.5rem 1.5rem;

    @media screen and (max-width: 800px) {
        width: 90vw;
    }
`;

const UrlRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
`;

const CopyButton = styled.button`
    flex-shrink: 0;
    padding: 0.2rem 0.6rem;
    font-size: 0.8rem;
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
    | { type: "success"; url: string; warning?: string }
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
                    {result.warning && <p style={{ color: "var(--light-green)", fontStyle: "italic", marginBottom: "0.5rem" }}>{result.warning}</p>}
                    <p>Your compacted URL:</p>
                    <UrlRow>
                        <OutputUrl>{result.url}</OutputUrl>
                        <CopyButton onClick={handleCopy}>{copied ? "Copied!" : "Copy"}</CopyButton>
                    </UrlRow>
                </>)
                    :
                (<p>{result.message}</p>)
            }
        </StyledDiv>
    )
}