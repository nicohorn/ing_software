import mongoose from 'mongoose';

const PasswordRecoveryToken = new mongoose.Schema({

    token: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true
    }
});


export default mongoose.models.PasswordRecoveryToken || mongoose.model('PasswordRecoveryToken', PasswordRecoveryToken);