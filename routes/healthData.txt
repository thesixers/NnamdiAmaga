// Import necessary packages
import express from 'express';
import HealthData from '../model/healthData.js';
import axios from 'axios';
import HealthStatus from '../model/healthStatus.js';

const router = express.Router();

router.post('/', async (req, res) => {
  let { id, weight, sleepHours, bpm, systolic, diastolic } = req.body;
  console.log({ id, weight, sleepHours, bpm, systolic, diastolic });

  try {
    // Create health data in the database
    let data = await HealthData.create({ user: id, weight, sleepHours, bpm, systolic, diastolic });
    console.log(data);

    // Prepare data to send to the Python server
    const healthData = {
      weight,
      sleepHours,
      bpm,
      systolic,
      diastolic,
    };

    const response = await axios.post('http://localhost:5000/predict', healthData);
    console.log('Response from Python server:', response.data);

    let {health_status,prediction} = response.data;
    let riskLevel;
    health_status === 'normal' ? riskLevel = 'Low' : riskLevel = 'High'

    await HealthStatus.create({status: health_status, user: id, prediction, riskLevel})

    res.status(200).json({M: 'success!'});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating health data or predicting health status.', error: err.message });
  }
});


export default router;
