/**
 * Data Mapper Layer to normalize, clean, and validate data payloads from API layers.
 */
export const ideaMapper = {
  /**
   * Normalizes dashboard payload including config, ideas list, stats, and headers.
   * @param {Object} rawDashboard - Raw dashboard segment
   * @returns {Object}
   */
  mapDashboard(rawDashboard) {
    if (!rawDashboard)
      return {
        stats: [],
        ideas: [],
        filters: [],
        headers: [],
        statusConfigs: {},
      };

    const statusConfigs = rawDashboard.statusConfigs || {};
    const ideas = (rawDashboard.ideas || []).map((idea) => ({
      id: idea.id || "",
      title: idea.title || "فكرة بدون عنوان",
      submitter: idea.submitter || "غير معروف",
      department: idea.department || "غير محدد",
      innovationType: idea.innovationType || "غير محدد",
      timeHorizon: idea.timeHorizon || "H1",
      track: idea.track || "غير محدد",
      priority: idea.priority || "low",
      evaluatorsCount: Number(idea.evaluatorsCount) || 0,
      averageRating: Number(idea.averageRating) || 0,
      aiScore: Number(idea.aiScore) || 0,
      status: {
        id: idea.status?.id || "new",
        name: idea.status?.name || "فكرة جديدة",
      },
      submittedAt: idea.submittedAt || "منذ فترة",
    }));

    return {
      stats: rawDashboard.stats || [],
      ideas,
      filters: rawDashboard.filters || [],
      headers: rawDashboard.headers || [],
      statusConfigs,
    };
  },

  /**
   * Normalizes and merges idea details payload template with the base idea.
   * @param {Object} rawDetails - Raw details template from details.default or details[id]
   * @param {Object} [baseIdea] - Clicked base idea details loaded from the dashboard list
   * @returns {Object}
   */
  mapIdeaDetails(rawDetails, baseIdea) {
    const details = rawDetails || {};
    const merged = {
      ...details,
      id: baseIdea?.id || details.id || "DEFAULT-IDEA",
      title: baseIdea?.title || details.title || "فكرة افتراضية",
      submitter: baseIdea?.submitter || details.submitter || "غير معروف",
      department: baseIdea?.department || details.department || "غير محدد",
      averageRating: baseIdea?.averageRating ?? details.averageRating ?? 0,
      evaluatorsCount:
        baseIdea?.evaluatorsCount ?? details.evaluatorsCount ?? 0,
      aiScore: baseIdea?.aiScore ?? details.aiScore ?? 0,
      status: {
        id: baseIdea?.status?.id || details.status?.id || "new",
        name: baseIdea?.status?.name || details.status?.name || "فكرة جديدة",
      },
    };

    // Inject contextual idea metadata to the dynamic data payload of each tab
    if (Array.isArray(merged.tabs)) {
      merged.tabs = merged.tabs.map((tab) => {
        return {
          ...tab,
          data: {
            ...tab.data,
            ideaId: merged.id,
            ideaTitle: merged.title,
            ideaSubmitter: merged.submitter,
            ideaDepartment: merged.department,
          },
        };
      });
    }

    return merged;
  },

  /**
   * Normalizes analytics dashboard screen configurations.
   * @param {Object} rawAnalytics
   * @returns {Object}
   */
  mapAnalytics(rawAnalytics) {
    if (!rawAnalytics)
      return {
        liveSignal: {},
        quickActions: [],
        screens: {},
        drawerDetails: {},
      };
    return {
      liveSignal: rawAnalytics.liveSignal || {},
      quickActions: rawAnalytics.quickActions || [],
      screens: rawAnalytics.screens || {},
      drawerDetails: rawAnalytics.drawerDetails || {},
    };
  },
};
