import { notFound, redirect } from "next/navigation";
import getUrl from "@/lib/getUrl";

export default async function SlugPage({ params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = await params;
    const fullSlug = slug.join("/");
    const entry = await getUrl(fullSlug);

    if (!entry) return notFound();

    redirect(entry.longUrl);
}