import Maintenance from '../models/Maintenance.js';
import User from '../models/User.js';

export const getAllRequests = async (req, res) => {
  const requests = await Maintenance.find({})
    .populate('user', 'name flatNumber email')
    .sort({ createdAt: -1 });
  res.json(requests);
};

export const updateRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const request = await Maintenance.findById(id);
  if (!request) return res.status(404).json({ message: 'Request not found' });

  request.status = status;
  await request.save();

  res.json(request);
};

export const submitRequest = async (req, res) => {
  const { issue, description, flatNumber } = req.body;
  if (!issue || !description) return res.status(400).json({ message: 'Missing fields' });

  const request = await Maintenance.create({
    user: req.user._id,
    issue,
    description,
    flatNumber,
  });

  res.status(201).json(request);
};

export const getMyRequests = async (req, res) => {
  const requests = await Maintenance.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(requests);
};
