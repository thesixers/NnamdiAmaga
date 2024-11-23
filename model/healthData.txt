import mongoose from "mongoose";

const healthDataSchema = new mongoose.Schema({
  user: { type: String, ref: 'User', required: true },
  weight: { type: Number, required: true },
  sleepHours: {type: Number},
  bpm: { type: Number, required: true },
  systolic: { type: Number, required: true },
  diastolic: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const HealthData = mongoose.model('HealthData', healthDataSchema);
export default HealthData;