const User = require('../models/user');

const Joi = require('joi');

// Register User
exports.registerUser = async (req, res) => {
  try {
    let { name, email, phone, image, status } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: 'User is already registered!' });
    }

    // Create the user
    user = new User({
      name,
      email,
      phone,
      image,
      status,
    });

    await user.save();
    res.status(201).json({ user, message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to retrieve users', error: err.message });
  }
};

// Delete User by ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete user', error: err.message });
  }
};

// Update User by ID
exports.updateUser = async (req, res) => {
    const { error } =req.body;
    if (error) return res.status(400).json({ message: error.details[0].message });
  
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { ...req.body, updated_date: new Date().toISOString() },
        { new: true }
      );
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to update user', error: err.message });
    }
  };

// Search Users by Name, Email, or Phone
exports.searchUsers = async (req, res) => {
  const { name, email, phone } = req.query;

  const query = {};
  if (name) query.name = new RegExp(name, 'i');
  if (email) query.email = new RegExp(email, 'i');
  if (phone) query.phone = new RegExp(phone, 'i');

  try {
    const users = await User.find(query);
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to search users', error: err.message });
  }
};

// Paginate Users
exports.paginateUsers = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  try {
    const users = await User.find().skip(skip).limit(limit);
    const totalUsers = await User.countDocuments();
    res.status(200).json({
      users,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to paginate users', error: err.message });
  }
};

// Delete Multiple Users
exports.deleteMultipleUsers = async (req, res) => {
  const { ids } = req.body;

  if (!Array.isArray(ids)) return res.status(400).json({ message: 'IDs should be an array' });

  try {
    await User.deleteMany({ _id: { $in: ids } });
    res.status(200).json({ message: 'Users deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete users', error: err.message });
  }
};
