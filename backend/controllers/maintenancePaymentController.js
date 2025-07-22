import MaintenancePayment from '../models/MaintenancePayment.js';


export const getMyPayments = async (req, res) => {
  const payments = await MaintenancePayment.find({ flatNumber: req.user.flatNumber });
  res.json(payments);
};

export const markPaymentAsRequested = async (req, res) => {
  const payment = await MaintenancePayment.findById(req.params.id);
  if (!payment) return res.status(404).json({ message: 'Payment not found' });

  if (payment.status === 'Paid') {
    return res.status(400).json({ message: 'Already marked as Paid' });
  }

  payment.status = 'Requested';
  await payment.save();

  res.json({ message: 'Payment marked as Requested. Admin will verify.' });
};

export const adminVerifyPayment = async (req, res) => {
  const payment = await MaintenancePayment.findById(req.params.id);
  if (!payment) {
    res.status(404);
    throw new Error('Payment not found');
  }
  payment.paid = true;
  payment.paidDate = new Date();
  await payment.save();
  res.json({ message: 'Payment marked as paid' });
};


export const createPaymentRecord = async (req, res) => {
  try {
    const { userId, flatNumber, amount, dueDate } = req.body;

    if (!userId || !flatNumber || !amount || !dueDate) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const payment = new MaintenancePayment({
      user: userId,           // Mongoose ObjectId
      flatNumber,
      amount,
      dueDate,
      paid: false,
      requestedPaid: false
    });

    await payment.save();

    res.status(201).json(payment);
  } catch (err) {
    console.error('Error creating payment:', err);
    res.status(500).json({ message: 'Failed to create payment' });
  }
};

export const getAllPayments = async (req, res) => {
  try {
    const payments = await MaintenancePayment.find().populate('user', 'name flatNumber email');
    res.json(payments);
  } catch (err) {
    console.error('Error fetching payments:', err);
    res.status(500).json({ message: 'Failed to load payments' });
  }
};