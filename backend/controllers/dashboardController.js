import Event from '../models/Event.js';
import Visitor from '../models/Visitor.js';
import Maintenance from '../models/Maintenance.js';

export const getAdminDashboardSummary = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [eventCount, visitorCount, maintenanceCount] = await Promise.all([
      Event.countDocuments({ date: { $gte: today } }),
      Visitor.countDocuments({ inTime: { $gte: today } }),
      Maintenance.countDocuments({ status: { $ne: 'Resolved' } })
    ]);

    res.json({
      events: eventCount,
      visitors: visitorCount,
      maintenance: maintenanceCount
    });
  } catch (error) {
    console.error('Dashboard summary error:', error);
    res.status(500).json({ message: 'Failed to fetch dashboard data' });
  }
};
