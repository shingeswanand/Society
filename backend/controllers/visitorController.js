import Visitor from '../models/Visitor.js';

export const addVisitor = async (req, res) => {
  const { name, purpose, flatNumber } = req.body;
  if (!name || !purpose || !flatNumber) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newVisitor = await Visitor.create({ name, purpose, flatNumber });
  res.status(201).json(newVisitor);
};

export const getVisitorsByFlat = async (req, res) => {
  const { flat } = req.query;
  const visitors = await Visitor.find({ flatNumber: flat }).sort({ timestamp: -1 });
  res.json(visitors);
};

export const getAllVisitors = async (req, res) => {
  const visitors = await Visitor.find().sort({ timestamp: -1 });
  res.json(visitors);
};
