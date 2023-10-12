import axios from 'axios';

import useAuth from '../../hooks/useAuth'

export function jwtInterceptor() {
    const { user } = useAuth()
    axios.interceptors.request.use(request => {
        const isLoggedIn = user?.token;
        const isApiUrl = request.url.startsWith(process.env.REACT_APP_API_URL) && !request.url.endsWith("/auth");

        if (isLoggedIn && isApiUrl) {
            request.headers.common.Authorization = `Bearer ${account.token}`;
        }

        return request;
    });
}
