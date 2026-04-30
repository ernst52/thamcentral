import jwt from 'jsonwebtoken';

// Its just for checking if you have token or not, for protecting CRUD
export async function authMiddleware(req, res, next) {
    const token  = req.cookies.jwt; 
    if (!token) {
        const err = new Error ("No token, unauthorized");
        err.status = 401;
        return next(err); // return so it stops here.
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // It's to verify if the token is real or not, check if the same from jwtutils that got stamped SECRET
        // prevents fake injected jwt token
        req.admin = decoded; // req.admin ends up being { id: adminId }. You could name it anything req.nigga, req.potato, whatever. It's just a way to pass the decoded token data forward 
        next(); 
    } catch (err) {
        err.status = 401; // Add this, can't be empty. A tampered/expired token will behave differently than a server error.
        next(err);
    }
}

// TODO: add JWT_SECRET in .env