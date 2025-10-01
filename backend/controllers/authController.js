const User = require("../models/User");
const generateToken = require("../utils/generateToken"); // Assuming a function to generate JWT

// @desc 	Register new user
// @route 	POST /api/auth/signup
// @access 	Public
exports.registerUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		// Validate required fields
		if (!name || !email || !password) {
			return res.status(400).json({ message: "Please fill all fields" });
		}

		// Check if user already exists
		const userExists = await User.findOne({ email });
		if (userExists) {
			return res.status(400).json({ message: "User already exists" });
		}

		// Create user (password is hashed in the User model pre-save hook)
		const user = await User.create({ name, email, password });

		if (user) {
			// Return token for immediate login
			res.status(201).json({ token: generateToken(user._id) });
		} else {
			res.status(400).json({ message: "Invalid user data" });
		}
	} catch (error) {
		console.error("Register Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

// @desc 	Authenticate user & get token
// @route 	POST /api/auth/login
// @access 	Public
exports.loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({ message: "Please provide email and password" });
		}

		const user = await User.findOne({ email });

		
		if (user && (await user.matchPassword(password))) {
			res.json({ token: generateToken(user._id) });
		} else {
			res.status(401).json({ message: "Invalid email or password" });
		}
	} catch (error) {
		console.error("Login Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

// @desc 	Get user profile
// @route 	GET /api/auth/profile
// @access 	Private
exports.getProfile = async (req, res) => {
	try {
		// req.user is populated by the protect middleware
		const user = await User.findById(req.user._id).select("-password");

		if (user) {
			// Returning all required fields for ProfilePage
			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				createdAt: user.createdAt,
			});
		} else {
			res.status(404).json({ message: "User not found" });
		}
	} catch (error) {
		console.error("Get Profile Error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

// @desc 	Update user profile
// @route 	PUT /api/auth/profile
// @access 	Private
exports.updateProfile = async (req, res) => {
	try {
		// Find the user using the ID stored in req.user by the protect middleware
		const user = await User.findById(req.user._id);

		if (user) {
			// 1. Update the fields based on req.body (using provided value or existing value)
			user.name = req.body.name || user.name;
			user.email = req.body.email || user.email;

			// 2. Save the changes to the database (Crucial Step for persistence)
			const updatedUser = await user.save();

			// 3. Return the updated data to the frontend
			res.json({
				_id: updatedUser._id,
				name: updatedUser.name,
				email: updatedUser.email,
				createdAt: updatedUser.createdAt,
			});
		} else {
			res.status(404).json({ message: "User not found" });
		}
	} catch (error) {
		console.error("Update Profile Error:", error);
		// Note:  error might be a validation error (e.g., duplicate email) from Mongoose
		res.status(500).json({ message: "Server error during profile update" });
	}
};
