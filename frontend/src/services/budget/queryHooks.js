// Create a new file services/budget/queryHooks.js
import { useQuery } from '@tanstack/react-query';
import { fetchSessionByPeriod, fetchBucketByPeriod, fetchGoals, fetchIncome } from 'services/budget/requests/get';

const useSessions = (period) => useQuery({
    queryKey: ['sessions', period],
    queryFn: () => fetchSessionByPeriod(period),
    enabled: !!period,
});

const useIncome = () => useQuery({
    queryKey: ['income'],
    queryFn: fetchIncome,
});

const useBuckets = (period) => useQuery({
    queryKey: ['buckets', period],
    queryFn: () => fetchBucketByPeriod(period),
    enabled: !!period,
});

const useGoals = () => useQuery({
    queryKey: ['goals'],
    queryFn: fetchGoals,
});

export {
    useSessions,
    useIncome,
    useBuckets,
    useGoals,
};