import mongoose from 'mongoose'
// creating events database schema
const eventsModel = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true 
    },
}, {timestamps: true})
export const Event = mongoose.model('Event', eventsModel)