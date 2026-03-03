import { urlsTable } from "../models/url.model.js"
import { nanoid } from 'nanoid'
import db from "../db/index.js"
export async function insertUrlToUrlTable({ url, shortCode, id }) {
    const code = shortCode ?? nanoid(6);
    const [result] = await db.insert(urlsTable).values({
        shortCode: code,
        targetURL: url,
        userId: id
    }).returning({ id: urlsTable.id, shortCode: urlsTable.shortCode, targetURL: urlsTable.targetURL });
    return result;
}