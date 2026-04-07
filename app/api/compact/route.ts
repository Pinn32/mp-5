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

        return Response.json({ url: `https://url-to.vercel.app/${result.slug}` });
    } catch (e) {
        console.error(e);
        return Response.json({ error: "Failed to save to database" }, { status: 500 });
    }
}
