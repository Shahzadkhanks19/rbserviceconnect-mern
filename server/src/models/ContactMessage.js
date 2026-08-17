import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 160 },
    topic: { type: String, enum: ['general', 'candidate', 'recruiter', 'verification', 'accessibility'], default: 'general' },
    message: { type: String, required: true, trim: true, minlength: 10, maxlength: 3000 },
    status: { type: String, enum: ['new', 'reviewed', 'resolved'], default: 'new', index: true },
  },
  { timestamps: true },
);

export default mongoose.model('ContactMessage', contactMessageSchema);
