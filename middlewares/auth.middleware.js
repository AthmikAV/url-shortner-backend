import jwt  from "jsonwebtoken"
import "dotenv/config"
export function authenticationMiddleware(req, res, next) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        

         if (!decodedToken || !decodedToken.id) {
                return res.status(401).json({
                    error: "You must login to access resource"
                });
        }
        req.user = decodedToken;
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }
};
