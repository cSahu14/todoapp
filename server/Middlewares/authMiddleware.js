const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");


const protect = asyncHandler(async (req, res, next ) => {

    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Get Token

            token = req.headers.authorization.split(" ")[1]

            // Decode jwt
            const decode = jwt.verify(token, process.env.SECRET_KEY);

            // Get User
            req.user = await User.findById(decode.id).select("-password")

            next();


        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error("User not authorized.")
        }
    }

    if(!token) {
        res.status(401);
        throw new Error("Not authorized, no token")
    }
})

module.exports = {
    protect
}