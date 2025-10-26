import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../config/constants.js";

export function authMiddleware(req, res, next){
    const token = req.cookies['auth'];

    if(!token){
        return next();
    }

    try{
        const decodeToken = jwt.verify(token, JWT_SECRET);
        req.user = decodeToken;
        req.isAuthenticated = true;

        // Add to handlebars context.
        res.locals.user = decodeToken;
        res.locals.isAuthenticated = true;

        next()
    }catch(err){
        res.clearCookie('auth');
        res.redirect('/users/login');
    }
}

export function isAuth(req, res, next) {
    if(!req.isAuthenticated){
        res.redirect('/users/login');
    }
    next();
}

export function isGuest(req, res, next){
    if(req.isAuthenticated){
        return res.redirect('/');
    }

    next();
}