"use client";

import { useState } from "react";

import Title from "@/components/Title";
import Shortener from "@/components/Shortener";
import Output from "@/components/Output";

type Result =
    | { type: "success"; url: string }
    | { type: "error"; message: string };

export default function Home() {
    const [result, setResult] = useState<Result | null>(null);

    return(
        <>
            <Title />
            <Shortener onResult={setResult} />
            {result && <Output result={result} />}
        </>
    )
}
