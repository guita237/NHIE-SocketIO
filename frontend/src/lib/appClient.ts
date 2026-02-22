// src/lib/apiClient.ts
import axios from 'axios';
import { APP_CONFIG } from '../config/appConfig';

export const apiClient = axios.create({
    baseURL: APP_CONFIG.API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});
