import Event from '../models/Event.js';
import Maintenance from '../models/Maintenance.js';
import Visitor from '../models/Visitor.js';

export const getAdminSummary = async (req, res) => {
  try {
    const eventCount = await Event.countDocuments();
    const maintenanceCount = await Maintenance.countDocuments({ status: { $ne: 'Resolved' } });
    
    // Optional: Today's visitor count
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const visitorCount = await Visitor.countDocuments({
      timestamp: { $gte: today, $lt: tomorrow }
    });

    res.json({
      events: eventCount,
      maintenance: maintenanceCount,
      visitors: visitorCount
    });
  } catch (error) {
    console.error('Admin summary error:', error);
    res.status(500).json({ message: 'Failed to load summary' });
  }
};
