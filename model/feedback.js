import { Schema, model } from 'mongoose';

const userFeedbackSchema = new Schema({
  user: { type: String, ref: 'User', required: true },
  feedback: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const UserFeedback = model('UserFeedback', userFeedbackSchema);
export default UserFeedback;
