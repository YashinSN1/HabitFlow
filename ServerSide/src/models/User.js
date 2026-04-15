import mongoose from "mongoose";
import bcrypt from "bcrypt"

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9]+([_-]?[a-zA-Z0-9]+)*@gmail\.com$/.test(v);
            },
            message: props => `${props.value} is not a valid Gmail username!`
        }
    },

    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 15,
        select: false,
    },

    avatar: {
        type: String,
        default: 'https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109?f=y'
    },

    role: {
        type: String,
        enum: ['user', 'admin', 'moderator', 'PremiumUser'],
        default: 'user'
    },

    status: {
        type: String,
        enum: ['active', 'banned', 'pending'],
        default: 'active'
    },

    lastLogin: {
        type: Date
    },

    refreshTokens: [
        {
            token: { type: String },
            createdAt: { type: Date, default: Date.now }
        }
    ]

}, { timestamps: true });


UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next()
})

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
