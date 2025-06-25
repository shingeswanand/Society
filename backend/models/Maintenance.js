import mongoose from 'mongoose';

const maintenanceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  issue: { type: String, required: true },
  description: { type: String, required: true },
  flatNumber: { type: String, required: true },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Resolved'],
    default: 'Pending',
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Maintenance', maintenanceSchema);
