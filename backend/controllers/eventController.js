import Event from '../models/Event.js';

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
    const { title, date, description } = req.body;

    if (!title || !date) {
      return res.status(400).json({ message: 'Title and date are required' });
    }

    const event = new Event({
      name: title,
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
export const getUpcomingEvents = async (req, res) => {
  try {
    const today = new Date();
    const events = await Event.find({ date: { $gte: today } }).sort('date');
    res.json(events);
  } catch (err) {
    console.error('Error fetching upcoming events:', err);
    res.status(500).json({ message: 'Failed to fetch upcoming events' });
  }
};
