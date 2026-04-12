import './config/env.js';
import mongoose from 'mongoose';
import { connectDb } from './config/database.js';
import { User } from './models/User.js';
import { Event } from './models/Event.js';
import { Booking } from './models/Booking.js';
import { Project } from './models/Project.js';
import { seedProjects } from './seedData.js';

/**
 * Dev seed script: resets MVP collections + portfolio projects and inserts demo users/events.
 * Intended for local databases only — do not run against production without review.
 */
await connectDb();

await Promise.all([Booking.deleteMany({}), Event.deleteMany({}), User.deleteMany({}), Project.deleteMany({})]);

await User.create([
  { name: 'Admin User', email: 'admin@example.com', password: 'Admin123!', role: 'admin' },
  { name: 'Organizer User', email: 'organizer@example.com', password: 'Organize123!', role: 'organizer' },
  { name: 'Attendee User', email: 'user@example.com', password: 'User12345!', role: 'user' },
]);

const organizer = await User.findOne({ email: 'organizer@example.com' }).lean();
if (!organizer) {
  throw new Error('Seed failed: organizer user missing');
}

const day = (n) => new Date(Date.now() + 1000 * 60 * 60 * 24 * n);

await Event.create([
  {
    title: 'NovaTech Annual Summit 2026',
    description:
      'Two-day leadership summit with executive keynotes, partner breakouts, and structured networking across dual tracks.',
    date: day(18),
    location: 'Bengaluru, India',
    price: 0,
    organizer: organizer._id,
  },
  {
    title: 'Lumen Smart Home Launch Experience',
    description:
      'Immersive launch with guided demo zones, media walkthroughs, and a main-stage reveal with hybrid livestream.',
    date: day(32),
    location: 'Mumbai, India',
    price: 4999,
    organizer: organizer._id,
  },
  {
    title: 'PulseFit Mall Activation Weekend',
    description:
      'High-footfall weekend activation with trials, challenges, and on-ground conversion tracking across two days.',
    date: day(7),
    location: 'Chennai, India',
    price: 0,
    organizer: organizer._id,
  },
  {
    title: 'Arjun & Meera — Udaipur Celebration',
    description:
      'Three-day destination wedding programme: mehendi, sangeet, and reception with coordinated logistics across venues.',
    date: day(55),
    location: 'Udaipur, India',
    price: 185000,
    organizer: organizer._id,
  },
  {
    title: 'FinEdge Leadership Offsite 2026',
    description:
      'Leadership offsite with strategy workshops, outdoor team blocks, and evening programming at a boutique resort.',
    date: day(41),
    location: 'Goa, India',
    price: 12500,
    organizer: organizer._id,
  },
  {
    title: 'IndusMed Annual Conference',
    description:
      'Single-track medical conference with CME sessions, exhibitor hall, and gala dinner for 350 delegates.',
    date: day(26),
    location: 'Hyderabad, India',
    price: 3500,
    organizer: organizer._id,
  },
  {
    title: 'Northwind Retail Expo',
    description:
      'Trade floor layout, booth power planning, and crowd-flow design for a two-day retail and supply-chain expo.',
    date: day(50),
    location: 'New Delhi, India',
    price: 750,
    organizer: organizer._id,
  },
  {
    title: 'Aurora D2C Pop-Up Tour — Pune Stop',
    description:
      'Compact pop-up with sampling, influencer slots, and same-day restock coordination for a D2C lifestyle brand.',
    date: day(12),
    location: 'Pune, India',
    price: 0,
    organizer: organizer._id,
  },
  {
    title: 'Skyline PropTech Product Day',
    description:
      'Single-day product narrative, customer panels, and partner roadmap sessions with AV and stage management.',
    date: day(63),
    location: 'Gurugram, India',
    price: 899,
    organizer: organizer._id,
  },
  {
    title: 'Coastal Arts Festival — Evening Series',
    description:
      'Four evenings of open-air performances, vendor coordination, and crowd safety planning along the waterfront.',
    date: day(21),
    location: 'Kochi, India',
    price: 299,
    organizer: organizer._id,
  },
]);

await Project.insertMany(seedProjects);

// eslint-disable-next-line no-console
console.log('Seed complete.');
// eslint-disable-next-line no-console
console.log('Demo accounts (passwords shown for local dev only):');
// eslint-disable-next-line no-console
console.log('- admin@example.com / Admin123!');
// eslint-disable-next-line no-console
console.log('- organizer@example.com / Organize123!');
// eslint-disable-next-line no-console
console.log('- user@example.com / User12345!');

await mongoose.disconnect();
