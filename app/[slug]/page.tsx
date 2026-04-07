import { notFound, redirect } from "next/navigation";
import getUrl from "@/lib/getUrl";

export default async function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const entry = await getUrl(slug);

    if (!entry) notFound();

    redirect(entry.longUrl);
}
