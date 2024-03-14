const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const nodemailer = require("nodemailer");

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: "smtppro.zoho.in",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: '', // your Zoho email
    pass: '', // your Zoho password
  },
});

// Register a new user
const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = new User({ username, email, password });
    await user.save();
    res.json({ message: "Registration successful" });
  } catch (error) {
    next(error);
  }
};

// Login with an existing user
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ userId: user._id }, "mysecretkey", {
      expiresIn: "1 hour",
    });
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

// Forgot Password
const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a unique password reset token
    const resetToken = jwt.sign({ userId: user._id }, "mysecret", {
      expiresIn: "1 hour",
    });

    // Email content
    const resetPasswordLink = `http://localhost:3000/password/reset?token=${resetToken}`;
    const mailOptions = {
      from: "",
      to: email,
      subject: "Password Reset Request",
      html: `<p>You have requested to reset your password. Please click on the following link to reset your password:</p>
             <a href="${resetPasswordLink}">${resetPasswordLink}</a>`,
    };

    // Send email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to send email" });
      } else {
        console.log("Email sent: " + info.response);
        res.json({ message: "Password reset link sent to your email" });
      }
    });
  } catch (error) {
    next(error);
  }
};
const resetPassword = async (req, res, next) => {
  const { token, newPassword } = req.body;

  try {
    // Verify and decode the JWT token
    const decoded = jwt.verify(token, "mysecret");

    // Check if token has expired
    if (decoded.exp < Date.now() / 1000) {
      return res.status(400).json({ message: "Token has expired" });
    }

    // Find user by user ID from token
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password in the database
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Failed to reset password" });
  }
};


module.exports = { register, login, forgotPassword, resetPassword };
