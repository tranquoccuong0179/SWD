import { useState } from 'react';
import axios from 'axios';

export const useApiClient = (baseURL: string) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [unauthorized, setUnauthorized] = useState(false);

    const apiRequest = async (method: string, url: string, data?: any) => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            setUnauthorized(true);
            setError('Authentication required');
            return null;
        }

        try {
            setLoading(true);
            const headers: any = {
                accept: '*/*',
                Authorization: `Bearer ${token}`,
            };

            if (!(data instanceof FormData)) {
                headers['Content-Type'] = 'application/json';
            }

            const response = await axios({
                method,
                url: `${baseURL}${url}`,
                headers,
                data,
            });

            if (response.data.statusCode !== 200) {
                throw new Error('Failed to fetch data');
            }

            return response.data.data;
        } catch (err: any) {
            if (axios.isAxiosError(err) && err.response?.status === 401) {
                setUnauthorized(true);
                setError('Unauthorized access - Please log in again');
            } else {
                setError(err.response?.data?.message || 'An error occurred');
            }
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, unauthorized, apiRequest };
};
