import { ObjectId } from "mongodb";
import { auth } from "@/auth";
import getCollection, { URL_SLUG } from "@/lib/db/db";
import validateSlug from "@/lib/validateSlug";

function ownedId(id: string, userId: string) {
    if (!ObjectId.isValid(id)) return null;
    return { _id: new ObjectId(id), userId };
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 });
    const filter = ownedId((await params).id, session.user.id);
    if (!filter) return Response.json({ error: "Not found" }, { status: 404 });

    const body = await request.json();
    let longUrl = typeof body.longUrl === "string" ? body.longUrl.trim() : "";
    const description = typeof body.description === "string" ? body.description.trim() : "";
    const slug = typeof body.slug === "string" ? body.slug.trim().replace(/^\/+|\/+$/g, "") : "";
    if (!longUrl) return Response.json({ error: "Long URL is required." }, { status: 400 });
    if (!/^https?:\/\//i.test(longUrl)) longUrl = `https://${longUrl}`;
    try {
        const parsedUrl = new URL(longUrl);
        if (!parsedUrl.hostname) throw new Error("Missing hostname");
    } catch {
        return Response.json({ error: "Please enter a valid URL." }, { status: 400 });
    }
    const slugError = validateSlug(slug);
    if (slugError) return Response.json({ error: slugError }, { status: 400 });
    if (description.length > 160) return Response.json({ error: "Description cannot exceed 160 characters." }, { status: 400 });
    if (description.split(/\s+/).filter(Boolean).length > 10) {
        return Response.json({ error: "Description cannot exceed 10 words." }, { status: 400 });
    }

    const collection = await getCollection(URL_SLUG);
    const conflict = await collection.findOne({ slug, _id: { $ne: filter._id } });
    if (conflict) return Response.json({ error: "That slug is already in use." }, { status: 409 });
    const updatedTime = new Date();
    const result = await collection.updateOne(filter, { $set: { longUrl, slug, description, updatedTime } });
    if (!result.matchedCount) return Response.json({ error: "Not found" }, { status: 404 });
    return Response.json({ longUrl, slug, description, updatedTime });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 });
    const filter = ownedId((await params).id, session.user.id);
    if (!filter) return Response.json({ error: "Not found" }, { status: 404 });
    const result = await (await getCollection(URL_SLUG)).deleteOne(filter);
    if (!result.deletedCount) return Response.json({ error: "Not found" }, { status: 404 });
    return new Response(null, { status: 204 });
}
