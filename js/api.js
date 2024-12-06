const BASE_URL = 'https://stage-ng-users.neuragames.tech';

export const responseMock = {
  "commentText": "Мир, где игровые квесты сочетаются с реальной пользой. Мы создаем экосистему, которая работает для тебя!",
  "subheading": "play learn earn"
};

/**
 * Generic function to make API requests.
 * @param {string} endpoint - The API endpoint (e.g., "/user/create").
 * @param {string} method - HTTP method (e.g., "POST", "GET", "PUT", "DELETE").
 * @param {Object|null} data - Request body (if applicable).
 * @param {Object} additionalHeaders - Additional headers for the request.
 * @returns {Promise<Object>} - The response data from the API.
 */
export const apiRequest = async (endpoint, method = 'POST', data = null, additionalHeaders = {}) => {
  const url = `${BASE_URL}${endpoint}`;

  const headers = {
    'Content-Type': 'application/json',
    ...additionalHeaders,
  };

  const config = {
    method,
    headers,
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Request error to ${url}:`, error);
    throw error;
  }
};
