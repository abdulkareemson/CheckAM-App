// src/api.js
import axios from "axios";

// Change this when deployed
const API_URL = "https://checkam-backend.vercel.app";

/**
 * Verifies a code against the backend
 * @param {string} code
 * @returns {Promise}
 */
export const verifyCode = (code) => {
  return axios.post(`${API_URL}/api/verify`, { code });
};

/**
 * Reports a fake/replay code
 * @param {string} code
 * @returns {Promise}
 */
export const reportCode = (code) => {
  return axios.post(`${API_URL}/api/report`, { code });
};

/**
 * Gets user profile (name, etc.)
 * @returns {Promise}
 */
export const getUser = () => {
  return axios.get(`${API_URL}/api/user`);
};

/**
 * Gets dashboard stats (points, scans, alerts, weather)
 * @returns {Promise}
 */
export const getDashboard = () => {
  return axios.get(`${API_URL}/api/dashboard`);
};

/**
 * Gets scan history
 * @returns {Promise}
 */
export const getHistory = () => {
  return axios.get(`${API_URL}/api/history`);
};

/**
 * Redeems airtime or data
 * @param {string} type 'airtime' | 'data'
 * @param {string|number} amount
 * @param {string} phone
 * @returns {Promise}
 */
export const redeemReward = (type, amount, phone) => {
  return axios.post(`${API_URL}/api/redeem`, { type, amount, phone });
};
