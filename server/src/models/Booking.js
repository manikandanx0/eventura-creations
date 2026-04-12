import mongoose from 'mongoose';

const STATUSES = ['pending', 'confirmed', 'cancelled'];

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true, index: true },
    status: { type: String, enum: STATUSES, default: 'confirmed' },
  },
  { timestamps: true }
);

// One booking document per user+event pair — prevents duplicate bookings at the database level.
bookingSchema.index({ user: 1, event: 1 }, { unique: true });

export const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
export const BOOKING_STATUSES = STATUSES;
