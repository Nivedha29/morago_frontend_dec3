export const logout = (navigate) => {
  localStorage.removeItem("token");
  localStorage.removeItem("currentUser");
  navigate("/login", { replace: true });
};