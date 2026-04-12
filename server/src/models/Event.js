import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, required: true, trim: true, maxlength: 8000 },
    date: { type: Date, required: true },
    location: { type: String, required: true, trim: true, maxlength: 300 },
    price: { type: Number, required: true, min: 0 },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  },
  { timestamps: true }
);

export const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);
