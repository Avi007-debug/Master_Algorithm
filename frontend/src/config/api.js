// API Configuration
// Remove trailing slash from API URL to prevent double slashes
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const API_BASE_URL = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;

export const API = {
  BASE_URL: API_BASE_URL,
  
  endpoints: {
    runAlgorithm: (algorithm) => `${API_BASE_URL}/run/${algorithm}`,
    getAlgorithms: () => `${API_BASE_URL}/api/algorithms`,
    health: () => `${API_BASE_URL}/health`,
  },
  
  async runAlgorithm(algorithm, inputs = []) {
    const response = await fetch(this.endpoints.runAlgorithm(algorithm), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inputs })
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to execute: ${response.statusText}`);
    }
    
    return response.json();
  },
  
  async getAlgorithms() {
    const response = await fetch(this.endpoints.getAlgorithms());
    if (!response.ok) {
      throw new Error('Failed to fetch algorithms');
    }
    return response.json();
  },
  
  async checkHealth() {
    const response = await fetch(this.endpoints.health());
    if (!response.ok) {
      throw new Error('Server health check failed');
    }
    return response.json();
  }
};
