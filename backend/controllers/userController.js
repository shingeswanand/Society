import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const generateToken = (id, role) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '30d' });

export const registerUser = async (req, res) => {
  const { name, email, password, flatNumber } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'User already exists' });

  const user = new User({ name, email, password, flatNumber }); // raw password
  await user.save(); // ✅ model will auto-hash it

  res.status(201).json({ message: 'Registered successfully' });
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: 'Invalid credentials' });

  res.json({ token: generateToken(user._id, user.role), user });
};


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // hide passwords
    res.json(users);
  } catch (err) {
    console.error('Fetch users failed:', err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};


// PUT /users/:id/role - Change user role
export const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { isAdmin } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.isAdmin = isAdmin;
    await user.save();
    res.json({ message: 'Role updated', user });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update role' });
  }
};

// DELETE /users/:id - Delete user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
};