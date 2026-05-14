import api from "./api";

// Helper to normalize paginated response
const getPageContent = (data) => {
  if (Array.isArray(data)) return data;
  return data?.content ?? [];
};

/**
 * GET user call history (centralized API)
 */
export const getUserCallHistory = async (params = {}) => {
  const response = await api.get("/profile/calls/history", { params });
  return response.data;
};

/**
 * GET home screen data (balance + categories + recent calls)
 */
export const getUserHomeData = async () => {
  const [balanceRes, categoriesRes, callsRes] = await Promise.allSettled([
    api.get("/profile/balance"),

    api.get("/profile/categories", {
      params: {
        page: 0,
        size: 6,
        sortBy: "id",
        sortDirection: "ASC",
        isActive: true,
      },
    }),

    getUserCallHistory({
      isMissed: false,
      isLast: true,
      page: 0,
      size: 3,
      sortBy: "id",
      sortDirection: "DESC",
    }),
  ]);

  return {
    balance:
      balanceRes.status === "fulfilled"
        ? Number(balanceRes.value.data || 0)
        : 0,

    topics:
      categoriesRes.status === "fulfilled"
        ? getPageContent(categoriesRes.value.data)
        : [],

    calls:
      callsRes.status === "fulfilled"
        ? getPageContent(callsRes.value)
        : [],
  };
};

/**
 * GET current balance
 */
export const getBalance = async () => {
  const response = await api.get("/profile/balance");
  return response.data;
};

/**
 * POST top-up request
 */
export const requestTopup = async (data) => {
  const response = await api.post("/user/deposit", {
    accountHolder: data.accountHolder,
    nameOfBank: data.nameOfBank,
    won: Number(data.won),
  });

  return response.data;
};