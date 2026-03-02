import { Router } from "express";
import bcrypt from "bcrypt";
import db from "../db/index.js";
import userTable from "../models/user.model.js";
import { getUserByEmail } from "../services/user.service.js";
import { signupPostRequestBodySchema } from "../validation/request.validation.js";
import { loginPostRequestBodySchema } from "../validation/request.validation.js"
import jwt from "jsonwebtoken";
import "dotenv/config"
import { generateToken } from "../utils/token.utils.js";

const router = Router();

router.post("/signup", async (req, res) => {
  try {
    const validationResult = await signupPostRequestBodySchema.safeParseAsync(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        error: validationResult.error.issues[0].message,
      });
    }

    const { firstname, lastname, email, password } = validationResult.data;

    const { existingUser } = await getUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [user] = await db
      .insert(userTable)
      .values({
        firstname,
        lastname,
        email,
        password: hashedPassword,
      })
      .returning({
        id: userTable.id,
        firstname: userTable.firstname,
        lastname: userTable.lastname,
        email: userTable.email,
        createdAt: userTable.createdAt,
      });

    return res.status(201).json({
      data: user,
      message: "Account created successfully",
    });

  } catch (error) {

    return res.status(500).json({
      error: "Something went wrong. Please try again later.",
    });
  }
});


router.post("/login", async (req, res) => {
    try {
        const validateLoginResult = await loginPostRequestBodySchema.safeParseAsync(req.body);
        if (!validateLoginResult.success) {
            return res.status(400).json({
                error: validateLoginResult.error.issues[0].message,
            });
        };
        const { email, password } = validateLoginResult.data;
        const { existingUser } = await getUserByEmail(email);
        if (!existingUser) {
            return res.status(400).json({
                message: "Invalid credential"
            })
        };

    
        const decryptedPassword = await bcrypt.compare(password, existingUser.password);
        if (!decryptedPassword) {
            return res.status(401).json({
                message: "Invalid credential"
            })
        };
        
        const {token} = generateToken({ id: existingUser.id });
        res.cookie("token", token);


        return res.status(200).json({
            message: "Login successful",
        });


    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
}
});

export default router;