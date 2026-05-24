/*
  📘 Destination Service — API calls for browsing/managing destinations.
  
  Note: GET endpoints are PUBLIC (no login needed).
  POST/PATCH/DELETE need authentication (handled by cookies automatically).
*/

import api from './api.js';

// ─── GET ALL DESTINATIONS (PUBLIC) ────────────────────────────────
// GET /api/v1/destinations?search=xxx&city=xxx&category=xxx&page=1
export const getDestinations = async (params = {}) => {
  const response = await api.get('/destinations', { params });
  return response.data;
};

// ─── GET SINGLE DESTINATION (PUBLIC) ──────────────────────────────
// GET /api/v1/destinations/:id
export const getDestinationById = async (id) => {
  const response = await api.get(`/destinations/${id}`);
  return response.data;
};

// ─── CREATE DESTINATION (AUTH REQUIRED) ───────────────────────────
// POST /api/v1/destinations
export const createDestination = async (data) => {
  const response = await api.post('/destinations', data);
  return response.data;
};

// ─── ADD DESTINATION TO TRIP (AUTH REQUIRED) ──────────────────────
// POST /api/v1/trips/:tripId/destinations
export const addDestinationToTrip = async (tripId, data) => {
  const response = await api.post(`/trips/${tripId}/destinations`, data);
  return response.data;
};

// ─── GET TRIP'S DESTINATIONS (AUTH REQUIRED) ──────────────────────
// GET /api/v1/trips/:tripId/destinations
export const getTripDestinations = async (tripId, params = {}) => {
  const response = await api.get(`/trips/${tripId}/destinations`, { params });
  return response.data;
};

// ─── DELETE TRIP DESTINATION (AUTH REQUIRED) ──────────────────────
// DELETE /api/v1/trip-destinations/:id
export const removeTripDestination = async (id) => {
  const response = await api.delete(`/trip-destinations/${id}`);
  return response.data;
};
