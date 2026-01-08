export const isUserLoggedIn = () => {
  return !!localStorage.getItem("userToken");
};

export const isAdminLoggedIn = () => {
  return !!localStorage.getItem("adminToken");
};
