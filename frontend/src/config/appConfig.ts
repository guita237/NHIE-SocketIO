// src/config/appConfig.ts

export const APP_CONFIG = {
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api',
    SOCKET_URL: import.meta.env.VITE_SOCKET_URL || window.location.origin,
} as const;
