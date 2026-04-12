import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const ROLES = ['user', 'organizer', 'admin'];

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 200,
    },
    password: { type: String, required: true, minlength: 8, select: false },
    role: { type: String, enum: ROLES, default: 'user' },
  },
  { timestamps: true }
);

/**
 * Hash password before persisting new/changed passwords.
 */
userSchema.pre('save', async function hashPasswordPreSave() {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/**
 * Compare a plain password with the stored hash (used on login).
 */
userSchema.methods.comparePassword = async function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const USER_ROLES = ROLES;
