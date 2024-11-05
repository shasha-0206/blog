import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from './Schema/User_data.js';
import { nanoid } from 'nanoid';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

// MongoDB Connection
const DB_URL = process.env.DB_URL;
mongoose.connect(DB_URL)
    .then(() => console.log('MongoDB connection successful'))
    .catch(error => console.log(`MongoDB connection failed due to ${error}`));

// Express App Initialization
const port = 3000;
const app = express();

app.use(express.json());

// cors for getting data form different port
app.use(cors());

// Validation regex
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

// Generate username (add random string if username exists)
const generate_username = async (email) => {

    // setting username 
    let username = email.split("@")[0];
    let username_exist = await User.exists({ username });
    
    if (username_exist) {
        // nanoid is used to generate some random text and joins it to username if a username already exists
        username += nanoid().substring(0, 5);
    }

    return username;
};

// Format user data for response
const formatted_data = (user) => {
    const access_token = jwt.sign({ id: user._id }, process.env.SECRET_ACCESS_KEY);
    return {
        access_token,
        username: user.username,
        email: user.email,
    };
};

// Signup Route
app.post("/signup", (req, res) => {
    const { email, password } = req.body;

    // Validation
    if (!email) {
        return res.status(403).json({ "error": "Enter email" });
    }

    if (!emailRegex.test(email)) {
        return res.status(403).json({ "error": "Email is invalid" });
    }

    if (!passwordRegex.test(password)) {
        return res.status(403).json({ "error": "Password must contain a number and uppercase letter" });
    }

    // Hash password and save user
    bcrypt.hash(password, 10, async (error, hashed_password) => {
        if (error) return res.status(500).json({ "error": "Error in hashing password" });

        const username = await generate_username(email);

        const user = new User({
            email,
            password: hashed_password,
            username,
        });

        user.save()
            .then((u) => {
                return res.status(200).json(formatted_data(u));
            })
            .catch(err => {
                // Handle duplicate email error
                if (err.code === 11000) {
                    return res.status(500).json({ "error": "Email or Username already exists" });
                }
                return res.status(500).json({ "error": err.message });
            });
    });
});

// Signin Route
app.post("/signin", (req, res) => {
    const { email, password } = req.body;

    // searching in databse for email 
    User.findOne({ email })
        .then((user) => {

            // if not found
            if (!user) {
                return res.status(403).json({ "error": "Email not found" });
            }

            // if found check password
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    return res.status(500).json({ "error": "Error occurred while logging in, please try again" });
                }

                if (!result) {
                    return res.status(403).json({ "error": "Incorrect password" });
                }
                return res.status(200).json(formatted_data(user));
            });
        })
        .catch((err) => {
            return res.status(500).json({ "error": err.message });
        });
});


app.listen(port, () => console.log(`App running on port ${port}`));