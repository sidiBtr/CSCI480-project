import mongoose from "mongoose";
const admin = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true 
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})

export const Admin = mongoose.model('Admin', admin)