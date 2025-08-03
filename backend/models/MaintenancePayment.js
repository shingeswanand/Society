import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  flatNumber: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  paid: {
    type: Boolean,
    default: false,
  },
  paidDate: Date,
  requestedPaid: {
    type: Boolean,
    default: false,
  },
});

const MaintenancePayment = mongoose.model('MaintenancePayment', paymentSchema);

export default MaintenancePayment;
