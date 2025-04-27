import { useQuery } from '@tanstack/react-query';
import { getProfile } from 'services/user/requests/get';

const useProfile = (accessToken) => useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    enabled: !!accessToken,
    staleTime: 20 * 60 * 1000, // 20mins
});

export {
    useProfile,
};