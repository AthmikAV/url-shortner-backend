import jwt  from "jsonwebtoken";

export function generateToken(payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "5m" });
    return {token};
}