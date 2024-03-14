import express from 'express'
import { Admin } from '../model/adminModel.js'
import bcrypt from 'bcrypt'
import  Jwt  from 'jsonwebtoken'
import { verifyToken } from '../verifyUser.js'

const adminRouter = express.Router()
adminRouter.post('/signup', async(req, res) => {
    
    try{
        const { email, username, password} = req.body
        if(!username || ! email || ! password)
            return res.status(400).json({message: 'please send required fields'})
        const user = await Admin.findOne({email})
        if(user) return res.status(400).json({message: 'user already exist'})
        const hashedPassword = bcrypt.hashSync(password, 10)
        const adminUser = new Admin({username, email, password: hashedPassword })
        await adminUser.save()
        return res.status(200).json({message: 'user created successfully'})
    } catch(error){
        console.log(error)
    }
    
})
adminRouter.post('/signin', async(req, res) => {
    try{
        const {email, password} = req.body
        if(!email || !password) return res.status(400).json({message: "please send all required fields"})
        const validAdmin = await Admin.findOne({email})
        if(!validAdmin) return res.status(401).json({message: 'wrong email'})
        const validPassword = bcrypt.compareSync(password, validAdmin.password)
        if(!validPassword) return res.status(401).json({message: 'wrong credential'})
        const expiryDate = new Date(Date.now() + 3600000) // 1h
        const token = Jwt.sign({id: validAdmin._id}, process.env.JWT_SECRET)
        const {password: userPassword, ...rest} = validAdmin.toObject()
        return res.cookie('token', token, {httpOnly: true}).status(200).json(rest)
    } catch(error){
        console.log(error)
    }
})
// get all admin users
adminRouter.get('/admins', async(req, res) => {
    try{
        const admins = await Admin.find({})
        if(!admins) return res.status(401).json({message: 'no users found'})
        return res.status(200).json({count: admins.length, admins})
    }catch(error){
        console.log(error)
    }
})
export default adminRouter;