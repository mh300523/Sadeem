import mockData from "@/mockData.json";
import { decisionSchema } from "@/config/decisionSchema";

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

  /**
   * Fetches UI decision schema configurations.
   * @returns {Promise<Object>}
   */
  async getDecisionSchema() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(JSON.parse(JSON.stringify(decisionSchema)));
      }, 300); // 300ms latency
    });
  },

  /**
   * Submits a final decision for an idea.
   * @param {string} ideaId - The ID of the idea
   * @param {Object} payload - The decision data payload
   * @returns {Promise<Object>}
   */
  async submitDecision(ideaId, payload) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: "تم إرسال القرار بنجاح" });
      }, 500); // 500ms latency
    });
  },

  /**
   * Saves a decision draft for an idea.
   * @param {string} ideaId - The ID of the idea
   * @param {Object} payload - The decision data payload
   * @returns {Promise<Object>}
   */
  async saveDecisionDraft(ideaId, payload) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: "تم حفظ المسودة بنجاح" });
      }, 400); // 400ms latency
    });
  },
};
