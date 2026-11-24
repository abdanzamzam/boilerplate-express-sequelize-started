const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User, Role } = require("../models");

class UserController {
    static async login(req, res) {
        try {
            const { email, password } = req.body;

            // Find user
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Validate password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            // Generate token
            const token = jwt.sign(
                { id: user.id, role: user.roleId },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            res.json({ message: "Login successfully", token });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error logging in" });
        }
    }

    static async logout(req, res, next) {
        res.json({
            message: "Logout successful",
        });
    }

    static async register(req, res) {
        try {
            const { name, email, password, roleId } = req.body;

            // Check if user already exists
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: "Email already in use" });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create user
            const user = await User.create({
                name,
                email,
                password: hashedPassword,
                roleId,
                status: "active",
            });

            res.status(201).json({ message: "Register successfully", user });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error registering user" });
        }
    }

    static async refreshToken(req, res) {
        try {
            const { token } = req.body;
            if (!token) {
                return res.status(401).json({ message: "Token required" });
            }

            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) return res.status(403).json({ message: "Invalid token" });

                const newToken = jwt.sign(
                    { id: decoded.id, role: decoded.role },
                    process.env.JWT_SECRET,
                    { expiresIn: "1h" }
                );
                res.json({ message: "Refresh token successfully", token: newToken });
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error refreshing token" });
        }
    }

    static async userInfo(req, res) {
        try {
            const user = await User.findByPk(req.user.id, {
                attributes: ["id", "name", "email", "avatar", "status"],
                include: [
                    {
                        model: Role,
                        as: "role",
                        attributes: ["id", "name"]
                    }
                ],
            });

            if (!user) res.status(404).json({ message: "User not found" });
            res.json({
                message: "User info fetched successfully",
                user: userData,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error fetching profile" });
        }
    }
}

module.exports = UserController;
