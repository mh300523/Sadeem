import mockData from "@/mockData.json";

/**
 * Service layer to mimic asynchronous API requests.
 */
export const ideaService = {
  /**
   * Fetches dashboard configuration, stats, list of ideas, and filters.
   * @returns {Promise<Object>}
   */
  async getDashboard() {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Deep copy mockData dashboard segment to prevent direct mutation references
        resolve(JSON.parse(JSON.stringify(mockData.dashboard)));
      }, 500); // 500ms latency
    });
  },

  /**
   * Fetches details payload template for a specific idea.
   * @param {string} id - The ID of the idea to fetch
   * @returns {Promise<Object>}
   */
  async getIdeaDetails(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const details = mockData.details[id] || mockData.details.default;
        resolve(JSON.parse(JSON.stringify(details)));
      }, 400); // 400ms latency
    });
  },

  /**
   * Fetches analytics views metrics configurations, live signals, and actions.
   * @returns {Promise<Object>}
   */
  async getAnalytics() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(JSON.parse(JSON.stringify(mockData.analytics)));
      }, 600); // 600ms latency
    });
  },
};
