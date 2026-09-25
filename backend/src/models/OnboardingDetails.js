const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OnboardingDetails = sequelize.define('OnboardingDetails', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  dob: { type: DataTypes.STRING, defaultValue: '24/04/1973' },
  gender: { type: DataTypes.STRING, defaultValue: 'Male' },
  pan_number: { type: DataTypes.STRING, defaultValue: 'ABCDE1234F' },
  aadhaar_number: { type: DataTypes.STRING, defaultValue: 'XXXX-XXXX-9012' },
  kyc_document_url: { type: DataTypes.STRING, defaultValue: '/uploads/pan_card.pdf' },
  address: { type: DataTypes.STRING, defaultValue: 'Bandra West, Sea Face View' },
  city: { type: DataTypes.STRING, defaultValue: 'Mumbai' },
  state: { type: DataTypes.STRING, defaultValue: 'Maharashtra' },
  pincode: { type: DataTypes.STRING, defaultValue: '400050' },
  country: { type: DataTypes.STRING, defaultValue: 'India' },
  occupation: { type: DataTypes.STRING, defaultValue: 'Business / Professional' },
  income_range: { type: DataTypes.STRING, defaultValue: '> ₹25 Lakhs' },
  experience: { type: DataTypes.STRING, defaultValue: 'Expert' },
  risk_profile: { type: DataTypes.STRING, defaultValue: 'Balanced' },
  investment_objective: { type: DataTypes.STRING, defaultValue: 'Growth & Income' },
  step_completed: { type: DataTypes.INTEGER, defaultValue: 7 },
  status: { type: DataTypes.STRING, defaultValue: 'APPROVED' }
});

module.exports = OnboardingDetails;
