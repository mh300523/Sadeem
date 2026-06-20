import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { ideaService } from "@/services/ideaService";

export const useIdeaStore = defineStore("ideaStore", () => {
  // --- State ---
  const ideas = ref([]);
  const stats = ref([]);
  const filters = ref([]);
  const headers = ref([]);
  const statusConfigs = ref({});
  const ideaDetails = ref({});
  const analyticsData = ref(null);
  
  // Scoped loading and error states to prevent race conditions during concurrent fetching
  const dashboardLoading = ref(false);
  const dashboardError = ref(null);
  
  const detailsLoading = ref(false);
  const detailsError = ref(null);
  
  const analyticsLoading = ref(false);
  const analyticsError = ref(null);

  // Backward compatible computed variables
  const loading = computed(() => dashboardLoading.value || detailsLoading.value || analyticsLoading.value);
  const error = computed(() => dashboardError.value || detailsError.value || analyticsError.value);

  // --- Actions ---

  /**
   * Fetches dashboard data directly.
   */
  async function fetchDashboard() {
    dashboardLoading.value = true;
    dashboardError.value = null;
    try {
      const data = await ideaService.getDashboard();
      ideas.value = data.ideas || [];
      stats.value = data.stats || [];
      filters.value = data.filters || [];
      headers.value = data.headers || [];
      statusConfigs.value = data.statusConfigs || {};
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
      dashboardError.value = "حدث خطأ أثناء تحميل بيانات لوحة التحكم. يرجى المحاولة مرة أخرى.";
    } finally {
      dashboardLoading.value = false;
    }
  }

  /**
   * Fetches details for a specific idea and merges basic details.
   * @param {string} id - The ID of the idea
   */
  async function fetchIdeaDetails(id) {
    detailsLoading.value = true;
    detailsError.value = null;
    try {
      // If the page is reloaded, dashboard ideas might not be loaded.
      // We load them first to ensure we can find and merge the base idea details.
      if (ideas.value.length === 0) {
        await fetchDashboard();
      }

      const rawDetails = await ideaService.getIdeaDetails(id);
      const baseIdea = ideas.value.find((idea) => idea.id === id) || {};

      // Enrich details dynamically with base idea attributes
      const merged = {
        ...rawDetails,
        id: baseIdea.id || id || rawDetails.id,
        title: baseIdea.title || rawDetails.title || "فكرة افتراضية",
        submitter: baseIdea.submitter || rawDetails.submitter || "غير معروف",
        department: baseIdea.department || rawDetails.department || "غير محدد",
        averageRating: baseIdea.averageRating ?? rawDetails.averageRating ?? 0,
        evaluatorsCount: baseIdea.evaluatorsCount ?? rawDetails.evaluatorsCount ?? 0,
        aiScore: baseIdea.aiScore ?? rawDetails.aiScore ?? 0,
        status: {
          id: baseIdea.status?.id || rawDetails.status?.id || "new",
          name: baseIdea.status?.name || rawDetails.status?.name || "فكرة جديدة",
        },
      };

      // Propagate basic idea metadata to the dynamic data payload of each tab
      if (Array.isArray(merged.tabs)) {
        merged.tabs = merged.tabs.map((tab) => ({
          ...tab,
          data: {
            ...tab.data,
            ideaId: merged.id,
            ideaTitle: merged.title,
            ideaSubmitter: merged.submitter,
            ideaDepartment: merged.department,
          },
        }));
      }
      
      ideaDetails.value[id] = merged;
    } catch (err) {
      console.error(`Failed to fetch details for idea ${id}:`, err);
      detailsError.value = "حدث خطأ أثناء تحميل تفاصيل الفكرة. يرجى المحاولة مرة أخرى.";
    } finally {
      detailsLoading.value = false;
    }
  }

  /**
   * Fetches analytics data directly.
   */
  async function fetchAnalytics() {
    analyticsLoading.value = true;
    analyticsError.value = null;
    try {
      const data = await ideaService.getAnalytics() || {};
      analyticsData.value = {
        liveSignal: data.liveSignal || {},
        quickActions: data.quickActions || [],
        screens: data.screens || {},
        drawerDetails: data.drawerDetails || {},
      };
    } catch (err) {
      console.error("Failed to fetch analytics data:", err);
      analyticsError.value = "حدث خطأ أثناء تحميل تحليلات الأداء. يرجى المحاولة مرة أخرى.";
    } finally {
      analyticsLoading.value = false;
    }
  }

  return {
    // State
    ideas,
    stats,
    filters,
    headers,
    statusConfigs,
    ideaDetails,
    analyticsData,
    dashboardLoading,
    dashboardError,
    detailsLoading,
    detailsError,
    analyticsLoading,
    analyticsError,
    loading,
    error,
    
    // Actions
    fetchDashboard,
    fetchIdeaDetails,
    fetchAnalytics,
  };
});
