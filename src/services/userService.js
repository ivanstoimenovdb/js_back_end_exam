import bcrypt from "bcrypt";
import User from "../modules/user.js";
import { generateAuthToken } from "../utils/jwtUtils.js";


export async function register(email, password, repeatPassword){
    const user = await User.findOne({email});

    if(user){
        throw new Error('Email already exists!');
    }

    if(password !== repeatPassword){
        throw new Error('Password missmatch');
    }

    const createdUser = await User.create({email, password});

    const token = generateAuthToken(createdUser);
    
    return token;
}

export async function login(email, password) {
    const user = await User.findOne({email});

    if(!user){
        throw new Error('Invalid email or password !');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if(!isValid){
        throw new Error('Invalid email or password !');
    }

    const token = generateAuthToken(user);

    return token;
}