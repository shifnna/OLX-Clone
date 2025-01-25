import bcrypt from "bcrypt";
import { generateToken } from '../Helpers/jwtHelper.js';
import User from "../Models/UserSchema.js";

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log("Login attempt for email:", email); // Debug log
        const user = await User.findOne({ email });
        if (!user) {
            console.error("User not found");
            return res.status(400).json({ error: "User not found" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        console.log("Password match:", isPasswordMatch); // Debug log

        if (!isPasswordMatch) {
            console.error("Invalid password");
            return res.status(400).json({ error: "Invalid password" });
        }

        const token = await generateToken({ id: user._id, email: user.email });
        console.log("Token generated:", token); // Debug log

        return res.status(200).json({
            message: "Successfully logged in",
            token,
            user: { id: user._id, email: user.email, name:user.name },
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Server error" });
    }
};


export const signupUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error during user signup:", error);
        res.status(500).json({ error: "Server error" });
    }
};
