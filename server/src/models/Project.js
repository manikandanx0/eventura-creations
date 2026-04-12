import mongoose from 'mongoose';

const metricSchema = new mongoose.Schema(
  {
    value: { type: String, required: true },
    label: { type: String, required: true },
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    projectType: { type: String, required: true },
    location: { type: String, required: true },
    year: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    metrics: { type: [metricSchema], default: [] },
    hasCaseStudy: { type: Boolean, default: false },
    caseStudy: { type: mongoose.Schema.Types.Mixed, default: null },
  },
  { timestamps: true }
);

export const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
