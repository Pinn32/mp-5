import { UrlProps } from "@/lib/db/types";
import getCollection, { URL_SLUG } from "@/lib/db/db";

export default async function getUrl(slug: string): Promise<UrlProps | null> {
    const urlCollection = await getCollection(URL_SLUG);
    const doc = await urlCollection.findOne({ slug });

    if (!doc) return null;

    return {
        id: doc._id.toHexString(),
        longUrl: doc.longUrl,
        slug: doc.slug,
        createTime: doc.createTime,
    };
}
