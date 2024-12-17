// src/utils/auth.js

export const getToken = () => {
    return localStorage.getItem("token");
};

export const setToken = (token) => {
    localStorage.setItem("token", token);
};

export const setTokenExpiry = () => {
    localStorage.setItem("token_expiry", new Date().getTime() + 3600000);
};

export const removeToken = () => {
    localStorage.removeItem("token");
};

export const removeTokenExpiry = () => {
    localStorage.removeItem("token_expiry");
};
