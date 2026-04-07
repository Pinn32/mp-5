import { NextRequest } from "next/server";
import shortenUrl from "@/lib/shortenUrl";

export async function POST(req: NextRequest) {
    let { longUrl, slug } = await req.json();

    if (!longUrl || !slug) {
        return Response.json({ error: "longUrl and slug are required" }, { status: 400 });
    }

    if (!/^https?:\/\//i.test(longUrl)) {
        longUrl = "https://" + longUrl;
    }

    try {
        const result = await shortenUrl(longUrl, slug);

        if (!result) {
            return Response.json({ error: "Failed to save to database" }, { status: 500 });
        }

        const response: { url: string; warning?: string } = {
            url: `https://url-to.vercel.app/${result.slug}`,
        };

        if (result.originalSlug) {
            response.warning = `The slug "${result.originalSlug}" is already registered with another URL. Your link was assigned "${result.slug}" instead.`;
        }

        return Response.json(response);
    } catch (e) {
        console.error(e);
        return Response.json({ error: "Failed to save to database" }, { status: 500 });
    }
}