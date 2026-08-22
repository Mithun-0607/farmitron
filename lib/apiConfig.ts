/**
 * FARMiTRON API Configuration
 *
 * Reads NEXT_PUBLIC_API_URL from environment variables.
 * Falls back to localhost for local development.
 *
 * For production deployment, set NEXT_PUBLIC_API_URL to your deployed
 * FastAPI backend URL (e.g. https://farmitron-api.onrender.com).
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:8000';

export const API_ENDPOINTS = {
  predictCrop: `${API_BASE_URL}/predict-crop`,
  predictDisease: `${API_BASE_URL}/predict-disease`,
  predictWeather: `${API_BASE_URL}/predict-weather`,
  health: `${API_BASE_URL}/health`,
} as const;
