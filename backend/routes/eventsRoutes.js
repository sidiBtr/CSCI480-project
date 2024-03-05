import express from 'express'
import { Event } from '../model/events.model.js'
const eventRouter = express.Router()

// create an event
eventRouter.post('/create_event', async(req, res) => {
    const {title, description, date, startTime, endTime, image} = req.body
    try{
        if(!title || !description || !date||!startTime||!endTime||!image)
            return res.status(400).json({message: 'Please send all required fields'})
      const newEvent = new Event({title, description, date, startTime, endTime, image})
      await newEvent.save()
      return res.status(200).json({message: 'events created successfully'})

    } catch(error){
        console.log(error)
    }
})
// delete an event
eventRouter.delete('/deleteEvent/:id', async(req, res) => {
    const {id} = req.params
    try{
        const result = await Event.findByIdAndDelete({id})
        if(!result) return res.status(400).json({message: 'event not found'})
        return res.status(200).json({message: 'event deleted successfully'})
    } catch(error){
        console.log(error)
    }
})
// update an event
eventRouter.put('/updateEvent/:id', async(req, res) => {
    const {title, description, date, startTime, endTime, image} = req.body
    try{
        if(!title||!description||!date||!startTime||!endTime||!image) 
            return res.status(400).json({message: 'missing fields'})
        const {id} = req.params
        const result = await Event.findByIdAndUpdate({id})
        if(!result)
            return res.status(400).json({message: 'event does not exist'})
        return res.status(200).json({message: 'event updated successully'})
    } catch(error){
        console.log(error)
    }
})
// get all events
eventRouter.get('/allEvents', async(req, res) => {
    const events = await Event.find({})
    if(!events) return res.status(400).json({message: 'there are no events'})
    return res.status(200).json({count: events.length, events})
})
// delete all of the events

export default eventRouter
