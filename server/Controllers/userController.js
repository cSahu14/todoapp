const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, age, profession, password} = req.body;

    if(!name || !email || !age || !profession || !password ) {
        res.status(400);
        throw new Error("Please add all fields.")
    }

    // If user already exists

    const userExist = await User.findOne({ email })
    if(userExist) {
        res.status(400);
        throw new Error("User already exists.")
    }

    // Hash password

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    // create User

    const user = await User.create({
        name,
        email,
        password: hashedpassword,
        age,
        profession
    })

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            age: user.age,
            profession: user.profession,
            token: generateToken(user._id)
        })
    }else {
        res.status(400);
        throw new Error("Invalid User Data.")
    }
})

const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if( !email || !password ) {
        res.status(400);
        throw new Error("Invalid Data.")
    }

    const user = await User.findOne({ email });

    if(user && await bcrypt.compare(password, user.password)) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            age: user.age,
            profession: user.profession,
            token: generateToken(user._id)
        })
    }else {
        res.status(400);
        throw new Error("Invalid User.")
    }

})

const getMe = asyncHandler(async(req, res) => {
    const { _id, name, email, age, profession } = await User.findById(req.user.id);
    res.status(201).json({
        id: _id,
        name,
        email,
        age,
        profession
    })
})

const generateToken = (id) => {
    return jwt.sign({id}, process.env.SECRET_KEY, {
        expiresIn: "30d"
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}