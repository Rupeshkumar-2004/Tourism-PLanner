/*
  📘 Trip Service — All trip-related API calls in one place.
  
  Notice the pattern: every function is a thin wrapper around api.get/post/patch/delete.
  The component never needs to know the URL or how to construct the request.
*/

import api from './api.js';

// ─── CREATE TRIP ──────────────────────────────────────────────────
// POST /api/v1/trips
export const createTrip = async (tripData) => {
  const response = await api.post('/trips', tripData);
  return response.data;
};

// ─── GET USER'S TRIPS ─────────────────────────────────────────────
// GET /api/v1/trips?search=xxx&page=1&limit=10&sortBy=createdAt&sortType=desc
//
// 📘 LESSON: Query Parameters
// Instead of hardcoding params into the URL string, Axios lets you
// pass them as an object. It auto-converts { page: 1, limit: 10 }
// into ?page=1&limit=10. Cleaner and less error-prone!
export const getUserTrips = async (params = {}) => {
  const response = await api.get('/trips', { params });
  return response.data;
};

// ─── GET SINGLE TRIP ──────────────────────────────────────────────
// GET /api/v1/trips/:tripId
//
// 📘 Template literals (`backticks`) let us embed variables in strings.
// This is how we build dynamic URLs.
export const getTripById = async (tripId) => {
  const response = await api.get(`/trips/${tripId}`);
  return response.data;
};

// ─── UPDATE TRIP ──────────────────────────────────────────────────
// PATCH /api/v1/trips/:tripId
//
// 📘 PATCH vs PUT:
// PATCH = update only the fields you send (partial update)
// PUT = replace the entire resource
// Your backend uses PATCH — so we only send changed fields.
export const updateTrip = async (tripId, updates) => {
  const response = await api.patch(`/trips/${tripId}`, updates);
  return response.data;
};

// ─── DELETE TRIP ──────────────────────────────────────────────────
// DELETE /api/v1/trips/:tripId
export const deleteTrip = async (tripId) => {
  const response = await api.delete(`/trips/${tripId}`);
  return response.data;
};
