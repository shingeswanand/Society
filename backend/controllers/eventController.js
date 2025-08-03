import Event from '../models/Event.js';
import EventRegistration  from "../models/EventRegistration.js";


// 📅 Get all events (Admin)
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ message: 'Failed to fetch events' });
  }
};

// ➕ Add new event (Admin)
export const addEvent = async (req, res) => {
  try {
    const { name, date, description } = req.body;

    if (!name || !date) {
      return res.status(400).json({ message: 'Name and date are required' });
    }

    const event = new Event({
      name,
      date: new Date(date),
      description
    });

    await event.save();
    res.status(201).json(event);
  } catch (err) {
    console.error('Error adding event:', err);
    res.status(500).json({ message: 'Failed to add event' });
  }
};


// ✏️ Update event (Admin)
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    console.error('Error updating event:', err);
    res.status(500).json({ message: 'Failed to update event' });
  }
};

// ❌ Delete event (Admin)
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event deleted' });
  } catch (err) {
    console.error('Error deleting event:', err);
    res.status(500).json({ message: 'Failed to delete event' });
  }
};

// 🎯 Get only upcoming events (Resident)
// controllers/eventController.js

export const getUpcomingEvents = async (req, res) => {
  try {
    const today = new Date();
    const events = await Event.find({ date: { $gte: today } }).sort({ date: 1 });
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching events' });
  }
};


export const registerForEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: User not found.' });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found.' });
    }

    // Prevent duplicate registrations
    const alreadyRegistered = await EventRegistration.findOne({ event: eventId, user: userId });
    if (alreadyRegistered) {
      return res.status(400).json({ message: 'You have already registered for this event.' });
    }

    const newRegistration = new EventRegistration({
      event: eventId,
      user: userId,
    });

    await newRegistration.save();

    res.status(201).json({ message: 'You have successfully registered for the event.' });

  } catch (error) {
    console.error('Event registration error:', error);
    res.status(500).json({ message: 'Server error during event registration.' });
  }
};

// export const registerForEvent = async (req, res) => {
//   try {
//     const eventId = req.params.id;
//     const userId = req.user._id;

//     // Check if the event exists
//     const event = await Event.findById(eventId);
//     if (!event) {
//       return res.status(404).json({ message: 'Event not found' });
//     }

//     // Optionally: prevent duplicate registrations
//     const existing = await EventRegistration.findOne({
//       event: eventId,
//       user: userId,
//     });
//     if (existing) {
//       return res.status(400).json({ message: 'Already registered for this event.' });
//     }

//     const registration = new EventRegistration({
//       event: eventId,
//       user: userId,
//     });

//     await registration.save();

//     res.status(201).json({ message: 'Registered successfully' });
//   } catch (err) {
//     console.error('Registration error:', err);
//     res.status(500).json({ message: 'Failed to register' });
//   }
// };


// GET /api/events/latest
export const getLatestEvent = async (req, res) => {
  try {
    const event = await Event.findOne().sort({ date: -1 }); // or .sort({ createdAt: -1 })
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching latest event' });
  }
};


// GET /api/gallery/latest
export const getLatestGalleryImage = async (req, res) => {
  try {
    const latest = await Gallery.findOne().sort({ createdAt: -1 });
    res.json(latest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching latest gallery image' });
  }
};
