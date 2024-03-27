import mongoose from 'mongoose';

const VerificationCodeSchema = new mongoose.Schema({

    verificationCode: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true
    }
});


export default mongoose.models.VerificationCode || mongoose.model('VerificationCode', VerificationCodeSchema);