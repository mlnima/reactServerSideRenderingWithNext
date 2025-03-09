import mongoose from 'mongoose';

const contactFormSchema = new mongoose.Schema(
    {
        userId: mongoose.Schema.Types.ObjectId,
        name: String,
        email: String,
        subject: String,
        description: String,
        date: {
            type: Date,
            default: Date.now(),
        },
    },
    { timestamps: true },
);

export default mongoose.model('contact', contactFormSchema);
