import express from 'express'
import { Admin } from '../model/adminModel.js'
import bcrypt from 'bcrypt'
import  Jwt  from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
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
        // one day = 24 * 60 * 60 * 1000
        const token = Jwt.sign({id: validAdmin._id}, process.env.JWT_SECRET, {},)
        //res.cookie('token', token, {httpOnly: true, maxAge: 24*60*60*1000,})
        res.status(200).json({email: validAdmin.email, username: validAdmin.username, token})
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
// delete an admin user
adminRouter.delete('/delete/:id', async(req, res) => {
    const {id} = req.params
    try{
        const result = await Admin.findByIdAndDelete(id)
        if(!result) return res.status(400).json({message: 'user not found'})
        return res.status(200).json({message: "user deleted successfully"})
    }catch(error){
        console.log(error)
    }
})
// edit an event
adminRouter.put('/update/:id', async(req, res) => {
    const {username, email, password} = req.body
    const {id} = req.params
    try{
        if(!username ||!email||!password) return res.status(400).json({message: 'pleasse send all fields'})
        const updateFields = {
            username,
            email,
            password
    }
        const result = await Admin.findByIdAndUpdate(id, updateFields, {new: true})
        if(!result) return res.status(400).json({message: 'no user found'})
        return res.status(200).json({message: 'user updated successfully'})
    } catch(error){
        console.log(error)
    }
})
// log out 
adminRouter.post('/logout', (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        expiresIn: new Date(0)
    })
    res.status(200).json({message: 'logged out successfully'})
})
export default adminRouter;