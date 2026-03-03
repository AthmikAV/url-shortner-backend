import "dotenv/config";
import express from "express";
import userRouter from "./routes/user.routes.js"
import urlRouter from "./routes/url.routes.js"
import cookieParser from "cookie-parser"; 
import { authenticationMiddleware } from "./middlewares/auth.middleware.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.use('/user', userRouter);


app.get('/home', authenticationMiddleware, (req, res) => {
    res.status(200).json({
        message: "You are in home page"
    })
})
app.use(urlRouter);
app.listen(PORT, () => console.log(`Server is running in PORT: ${PORT}`));
