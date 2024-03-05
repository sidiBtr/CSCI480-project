import mongoose from 'mongoose'
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
    image: {
        type: String,
        required: false
    }
}, {timestamps: true})
export const Event = mongoose.model('Event', eventsModel)