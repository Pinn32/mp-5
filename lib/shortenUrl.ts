import { UrlProps } from "@/lib/db/types";
import getCollection, {URL_SLUG} from "@/lib/db/db";


export default async function shortenUrl(longUrl:string, slug:string,):Promise<UrlProps | null>{
    const urlCollection = await getCollection(URL_SLUG);

    const existing = await urlCollection.findOne({ longUrl, slug });
    if (existing) {
        return { id: existing._id.toHexString(), longUrl, slug, createTime: existing.createTime };
    }

    const createTime = new Date();
    const res = await urlCollection.insertOne({ longUrl, slug, createTime });

    if(!res.acknowledged){
        return null;
    }

    return { id: res.insertedId.toHexString(), longUrl, slug, createTime };
}
