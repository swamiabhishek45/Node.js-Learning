import mongoose from 'mongoose';
const urlSchema = new mongoose.Schema(
    {
        shortId: {
            type: String,
            required: true,
            unique: true,
        },
        redirectURL: {
            type: String,
            required: true,
        },
        visitHistory: [{ timestamps: { type: Number } }],
    },
    { timestamps: true }
);

export default URL = mongoose.model("url", urlSchema);

