import express from "express";
const router = express.Router();
import { authenticationMiddleware } from "../middlewares/auth.middleware.js";
import { shortenPostRequestBodySchema } from "../validation/request.validation.js";
import { insertUrlToUrlTable } from "../services/urls.services.js";
import { urlsTable } from "../models/url.model.js";
import { and, eq } from "drizzle-orm";
import db from "../db/index.js"

router.post("/shorten", authenticationMiddleware, async function (req, res) {
    const { id } = req.user;

    const validationResult = await shortenPostRequestBodySchema.safeParseAsync(req.body);

    if (validationResult.error) {
        return res.status(400).json({
            error: validationResult.error.issues[0].message,
        })
    }

    const { url, shortCode } = validationResult.data;
    
    const result = await insertUrlToUrlTable({ url, shortCode,id });

    return res.status(201).json({
        id: result.id, shortCode: result.shortCode, targetURL: result.targetURL
    });

});

router.get('/codes', authenticationMiddleware, async function (req, res) {
    try {
        const codes = await db.select().from(urlsTable).where(eq(urlsTable.userId, req.user.id));

        return res.json({ codes });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
});

router.delete('/:id', authenticationMiddleware, async function (req, res) {
    try {
        const id = req.params.id;
        await db.delete(urlsTable).where(and(eq(urlsTable.id, id), eq(urlsTable.userId, req.user.id)));
        return res.status(200).json({
            deleted: true
        })
    } catch (error) {
        
    }
});


router.get("/:shortCode", async function (req, res) {
    try {
        const code = req.params.shortCode;

        const [result] = await db
            .select({
                targetURL: urlsTable.targetURL
            })
            .from(urlsTable)
            .where(eq(urlsTable.shortCode, code));

        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Short URL not found"
            });
        }

        return res.redirect(result.targetURL);

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
});



export default router