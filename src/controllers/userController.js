import User from "../models/User.js"
import bcrypt from "bcrypt";
//import jwt from "jsonwebtoken"
import AppError from "../utils/AppError.js";

export const registerUser = async (req, res, next) => {
    try {

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(new AppError ("User already exists", 400 ));
        }
        const hashedPassword = await bcrypt.hash(password, 10);


        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })
        res.status(201).json({
            message: "User created seccessfullly",
            user
        });
    } catch (error) {
       next(error);
    }
}


export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
           return next(new AppError("Invalid credentials", 400));
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
           return next(new AppError("Invalid credentials", 400));

        }

        /*const token = jwt.sign(
            { 
                id:user._id,
            role:user.role },

            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        )*/

        res.status(200).json({
            message:"Login successfull",
            user:{
                id: user._id,
                name: user.name,
                email:user.email,
                role:user.role
            }
        })
    }catch(error){
       next(error)
    }
}

export const errorUser = async (req, res, next)=>{
    try{
        const user = await User.findById(req.params.id);

        if(!user){
            return next (new AppError("User not found", 404));
        }
        res.status(200).json(user);
    }catch(error){
        next(error)
    }
}

/*export const getMe = async(req, res, next)=>{
    try{
        const user = req.user;

        res.status(200).json({
            success: true,
            user:{
                id: user._id,
                name:user.name,
                email:user.email,
                role:user.role,
            }
        })
    }catch (error){
        next(error)
    }
}
*/

export const getAllUsers = async (req, res, next) => {
    try{
 const {search, role} = req.query;

 let filter ={};
 if(role) filter.role = role;
 if(search) 
    filter.$or = [
{ name:{ $regex: search, $options:"i"}},
{email:{$regex:search, $options:"i"}},
]

const users =await User.find(filter).select("-password");

res.status(200).json({
    status:"Success",
    results: users.length,
data:users,
});
} catch(err){
    next(err);
}
}

export const deleteUser = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id);

        if(!user){
            return next (new AppError("User not found", 404))
        }

        //Prevent admin deleting self 
        /*if(user._id.toString()=== req.user._id.toString()){
            return next (new AppError("You cannot delete yourself", 400))
        }*/
  await user.deleteOne();

  res.status(200).json({
    status: "success",
    message: "User deleted successfuly",
  });
}catch (err){
    next(err);
}
}

export const updateUserRole = async (req, res, next) => {
    try{
  const { role } = req.body;

  if(!role){
    return next(new AppError("Role is required",400));
  }

const user = await User.findById(req.params.id);

if(!user){
    return next (new AppError("User nor found",404)) 
}

user.role = role;
await user.save();

  res.status(200).json({
    status: "success",
    message:"User role updated",
    data: {
        id:user._id,
        role: user.role,
    }
  })
} catch(err){
next(err)
  }
};
