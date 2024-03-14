import jwt from 'jsonwebtoken'
export const verifyToken = (req, res, next) => {
    const token = req.cookies.token
    if(!token)
        return res.status(401).json({message: 'access denied need to login'})
    jwt.verify(token, process.env.JWT_SECRETE, (err, user) => {
        if(err)
            return res.status(401).json({message: 'Invalid token'})
        req.user = user
        next()
    })
}