import express from 'express'
import { Event } from '../model/events.model.js'
import multer from "multer";
const eventRouter = express.Router()

// create an event
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Define the directory where uploaded files should be stored
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      // Define the filename for the uploaded file
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
  // Initialize multer with the defined storage configuration
  const upload = multer({ storage: storage });
  
  // Create Event route with multer middleware for handling file upload
  eventRouter.post('/create_event', upload.single('image'), async (req, res) => {
    const { title, description, date, startTime, endTime } = req.body;
    const image = req.file; // Retrieve uploaded image information from req.file
    
    try {
      if (!title || !description || !date || !startTime || !endTime || !image) {
        return res.status(400).json({ message: 'Please send all required fields including the image' });
      }
  
      // Create a new Event instance with the provided data
      const newEvent = new Event({
        title,
        description,
        date,
        startTime,
        endTime,
        image: req.protocol + '://' + req.get('host') + '/uploads/' + req.file.filename // Store the path of the uploaded image
      });
      // Save the new event to the database
      await newEvent.save();
  
      // Return success message
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
eventRouter.put('/updateEvent/:id',upload.single('image'), async(req, res) => {
  const { title, description, date, startTime, endTime } = req.body;
  const image = req.file;
  console.log('request payload', req.body);
  console.log('image is', image);

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

      // If image exists, update image field
      if (image) {
        console.log('image is', image)
          updateFields.image = req.protocol + '://' + req.get('host') + '/uploads/' + req.file.filename;
      }

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
