import { Router } from "express";
import bcrypt from "bcrypt";
import  db  from '../db/index.js'
import userTable from '../models/user.model.js'
import { eq } from "drizzle-orm";
    
    
const router = Router();

router.post('/signup',async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        if (!firstname) return res.status(400).json({ error: "First name is requires" });
        if (!email) return res.status(400).json({ error: "Email is requires" });
        if (!password) return res.status(400).json({ pass: "Password is requires" });
        
        if (firstname.length < 4) return res.status(400).json({ error: "First name must have more than 5 character" });
        if (password.length < 4) return res.status(400).json({ error: "Password must have more than 5 character" });

        const [existingUser] = await db.select({ firstname: userTable.firstname }).from(userTable).where(eq(userTable.email, email));

        if (existingUser) {
            return res.status(401).json({
                message: "User Allready exists"
            });
        }

        const cryptedPassword =await bcrypt.hash(password, 10)
        



        const user = await db.insert(userTable).values({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: cryptedPassword
        }).returning();;

        res.status(201).json({
            data: user,
            message:"Account is created"
        })

    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
});


export default router;