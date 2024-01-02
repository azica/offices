export const setTokenFromStorage = (token: Response.Tokens) => {
  localStorage.setItem("token", JSON.stringify(token));
};

export const clearLocalStorage = () => localStorage.removeItem("token");

export const getTokensFromStorage = () => {
  const storage: string | null = localStorage.getItem("token");
  if (storage !== null && storage !== "undefined") {
    const token: Response.Tokens | null = JSON.parse(storage);
    return token;
  }

  return null;
};
