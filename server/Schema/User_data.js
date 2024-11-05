import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        minlength: [3, 'Username must be at least 3 characters long'],
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, 
{
    timestamps: {
        createdAt: 'joinedAt',
        updatedAt: 'lastUpdated'
    }
});

export default mongoose.model("users", userSchema);
