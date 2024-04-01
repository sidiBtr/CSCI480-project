import jwt from 'jsonwebtoken'
export const verifyToken = (req, res, next) => {
    const token = req.cookies.token
    if(!token)
        return res.status(401).json({message: 'access denied need to login'})
    const user = jwt.verify(token, process.env.JWT_SECRETE)
    if(!user){
        res.clearCookie('token')
        return res.status(400).json({message: 'invalid token'})
    }
    req.validAdmin = user
    next()
}