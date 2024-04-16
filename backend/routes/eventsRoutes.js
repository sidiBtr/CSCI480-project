import express from 'express'
import { Event } from '../model/events.model.js'
const eventRouter = express.Router()
  // create an event and add it to the database
  eventRouter.post('/create_event', async (req, res) => {
    const { title, description, date, startTime, endTime } = req.body;
    console.log(req.body)
    
    try {
      if (!title || !description || !date || !startTime || !endTime) {
        return res.status(400).json({ message: 'Please send all required fields' });
      }
      const newEvent = new Event({
        title,
        description,
        date,
        startTime,
        endTime,
      });
      await newEvent.save();
      return res.status(200).json({ message: 'Event created successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
// delete an event
eventRouter.delete('/deleteEvent/:id', async(req, res) => {
    const {id} = req.params
    try{
        const result = await Event.findByIdAndDelete(id)
        if(!result) return res.status(400).json({message: 'event not found'})
        return res.status(200).json({message: 'event deleted successfully'})
    } catch(error){
        console.log(error)
    }
})

// update an event
eventRouter.put('/updateEvent/:id', async(req, res) => {
  const { title, description, date, startTime, endTime } = req.body;
  console.log('request payload', req.body);

  try {
      if (!title || !description || !date || !startTime || !endTime) {
          return res.status(400).json({ message: 'Missing fields' });
      }

      const { id } = req.params;
      let updateFields = {
          title,
          description,
          date,
          startTime,
          endTime
      };
      const result = await Event.findByIdAndUpdate(id, updateFields, { new: true });

      if (!result) {
          return res.status(400).json({ message: 'Event does not exist' });
      }

      return res.status(200).json({ message: 'Event updated successfully' });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
  }
});

// get all events
eventRouter.get('/allEvents', async(req, res) => {
    const events = await Event.find({})
    if(!events) return res.status(400).json({message: 'there are no events'})
    return res.status(200).json({count: events.length, events})
})
// delete all of the events

export default eventRouter
