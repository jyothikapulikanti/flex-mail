import User from "../models/User.js";


// 🔐 SIGNUP
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create user (password will be hashed automatically)
    const user = await User.create({
      name,
      email,
      password
    });

    // send safe response (no password)
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// 🔐 LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    // send safe response
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};