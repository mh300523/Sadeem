import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { ideaService } from "@/services/ideaService";
import { ideaMapper } from "@/mappers/ideaMapper";

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
   * Fetches dashboard data, normalizes it, and updates dashboard states.
   */
  async function fetchDashboard() {
    dashboardLoading.value = true;
    dashboardError.value = null;
    try {
      const data = await ideaService.getDashboard();
      const mapped = ideaMapper.mapDashboard(data);
      ideas.value = mapped.ideas;
      stats.value = mapped.stats;
      filters.value = mapped.filters;
      headers.value = mapped.headers;
      statusConfigs.value = mapped.statusConfigs;
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
      dashboardError.value = "حدث خطأ أثناء تحميل بيانات لوحة التحكم. يرجى المحاولة مرة أخرى.";
    } finally {
      dashboardLoading.value = false;
    }
  }

  /**
   * Fetches full details for a specific idea and updates the ideaDetails map.
   * Resolves base idea meta to overlay correctly.
   * @param {string} id - The ID of the idea
   */
  async function fetchIdeaDetails(id) {
    detailsLoading.value = true;
    detailsError.value = null;
    try {
      // Ensure dashboard data is loaded so we can resolve the base idea info
      if (ideas.value.length === 0) {
        dashboardLoading.value = true;
        const dashboardData = await ideaService.getDashboard();
        const mappedDashboard = ideaMapper.mapDashboard(dashboardData);
        ideas.value = mappedDashboard.ideas;
        statusConfigs.value = mappedDashboard.statusConfigs;
        dashboardLoading.value = false;
      }

      const rawDetails = await ideaService.getIdeaDetails(id);
      const baseIdea = ideas.value.find((idea) => idea.id === id);
      const mappedDetails = ideaMapper.mapIdeaDetails(rawDetails, baseIdea);
      
      ideaDetails.value[id] = mappedDetails;
    } catch (err) {
      console.error(`Failed to fetch details for idea ${id}:`, err);
      detailsError.value = "حدث خطأ أثناء تحميل تفاصيل الفكرة. يرجى المحاولة مرة أخرى.";
    } finally {
      detailsLoading.value = false;
    }
  }

  /**
   * Fetches analytics data, normalizes it, and updates analyticsData state.
   */
  async function fetchAnalytics() {
    analyticsLoading.value = true;
    analyticsError.value = null;
    try {
      const data = await ideaService.getAnalytics();
      analyticsData.value = ideaMapper.mapAnalytics(data);
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
