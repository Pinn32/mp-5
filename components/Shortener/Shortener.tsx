import { useState } from "react";
import {
    StyledSection,
    StyledDiv,
    StyledInput,
    StyledSlugDiv,
    StyledFlexInput,
    StyledButton,
} from "./ShortenerStyles";

type Result =
    | { type: "success"; url: string }
    | { type: "error"; message: string };

interface ShortenerProps {
    onResult: (result: Result) => void;
}

export default function Shortener({ onResult }: ShortenerProps) {
    const [longUrl, setLongUrl] = useState("");
    const [slug, setSlug] = useState("");

    async function handleClick() {
        try {
            const res = await fetch("/api/compact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ longUrl, slug }),
            });
            if (!res.ok) {
                const message = await res.text();
                onResult({ type: "error", message: `Failed to compact: ${message}` });
                return;
            }
            const { url } = await res.json();
            onResult({ type: "success", url });
        } catch (e) {
            onResult({ type: "error", message: `Failed to compact: ${e instanceof Error ? e.message : "Unknown error"}` });
        }
    }

    return(
        <StyledSection id="shortener">
            <StyledDiv>
                <label htmlFor="long-url">
                    Enter your long URL:
                </label>
                <StyledInput
                    id="long-url"
                    placeholder="https://example.com/long/url/"
                    value={longUrl}
                    onChange={e => setLongUrl(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleClick()}
                />
            </StyledDiv>

            <StyledDiv>
                <label htmlFor="slug">
                    Enter a slug for your short URL:
                </label>
                <StyledSlugDiv>
                    <p>https://my-alias.vercel.app/</p>
                    <StyledFlexInput
                        id="slug"
                        placeholder="your-slug"
                        value={slug}
                        onChange={e => setSlug(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && handleClick()}
                    />
                    <StyledButton onClick={handleClick}>Click to Compact</StyledButton>
                </StyledSlugDiv>
            </StyledDiv>
        </StyledSection>
    )
}
