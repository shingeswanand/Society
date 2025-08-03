import Feedback from '../models/Feedback.js';

// Create feedback
export const createFeedback = async (req, res) => {
  const { type, rating, message } = req.body;

  const feedback = new Feedback({
    user: req.user._id,
    type,
    rating,
    message
  });

  await feedback.save();
  res.status(201).json(feedback);
};

// Resident: get own feedback
export const getMyFeedback = async (req, res) => {
  const feedbacks = await Feedback.find({ user: req.user._id }).sort('-createdAt');
  res.json(feedbacks);
};

// Admin: get all feedback
export const getAllFeedback = async (req, res) => {
  const feedbacks = await Feedback.find().populate('user').sort('-createdAt');
  res.json(feedbacks);
};
