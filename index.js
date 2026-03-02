import "dotenv/config";
import express from "express";
import userRouter from "./routes/user.routes.js"
import cookieParser from "cookie-parser"; 


const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.use('/user', userRouter);

app.get('/home', (req, res) => {
    res.status(200).json({
        message:"You are in home page"
    })
})

app.listen(PORT, () => console.log(`Server is running in PORT: ${PORT}`));
