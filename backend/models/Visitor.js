import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  purpose: { type: String, required: true },
  flatNumber: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('Visitor', visitorSchema);
