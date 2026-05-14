import api from "./api";

const getPageContent = (data) => {
  if (Array.isArray(data)) return data;
  return data?.content ?? [];
};

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

    api.get("/profile/calls/history", {
      params: {
        isMissed: false,
        isLast: true,
        page: 0,
        size: 3,
        sortBy: "id",
        sortDirection: "DESC",
      },
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
        ? getPageContent(callsRes.value.data)
        : [],
  };
};

// GET current balance
export const getBalance = async () => {
  const response = await api.get("/profile/balance");
  return response.data;
};

// POST top-up request
export const requestTopup = async (data) => {
  const response = await api.post("/user/deposit", {
    accountHolder: data.accountHolder,
    nameOfBank: data.nameOfBank,
    won: Number(data.won),
  });

  return response.data;
};