/*import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
    try {
        //1. Get token from header
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        //2. if no token
        if (!token) {
            return next(new AppError("No token, authoriation denied", 401));
        }
        
        //3. Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //4. Check if user still exists
           const currentUser = await User.findById(decoded.id).select("-password");

            if (!currentUser) {
                return next(new AppError("User no longer exists", 401));
            }

            //5. Attach user to request
            req.user = currentUser

            next();
        } catch (err) {
            if(err.name === "TokenExpiredError"){
            return next(
                new AppError("Session expired. Please login again.", 401));
        }
        return next(new AppError("Invalid token", 401));   
    }
    };


    export const restrictTo = (...roles) => {
        return (req, res, next) => {
            if (!roles.includes(req.user.role)) {
                return next(
                    new AppError("You do not have permission to perform this action", 403))
            }
            next();
        }
    }

*/