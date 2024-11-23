import { Schema, model } from 'mongoose';

const healthStatusSchema = new Schema({
  user: { type: String, ref: 'User', required: true },
  status: { type: String, required: true },  // e.g., "Normal", "Hypertension"
  riskLevel: { type: String, required: true },  // e.g., "Low", "Medium", "High"
  prediction: {type: Number},
  lastUpdated: { type: Date, default: Date.now },
});

const HealthStatus = model('HealthStatus', healthStatusSchema);
export default HealthStatus;
 