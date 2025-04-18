// Create a new file services/budget/queryHooks.js
import { useQuery } from '@tanstack/react-query';
import { fetchSession, fetchBucketByPeriod, fetchGoals, fetchIncome, fetchExpense } from 'services/budget/requests/get';

const useSessions = (period) => useQuery({
    queryKey: ['sessions'],
    queryFn: () => fetchSession(period),
    enabled: !!period,
});

const useIncome = () => useQuery({
    queryKey: ['income'],
    queryFn: fetchIncome,
});

const useExpense = () => useQuery({
    queryKey: ['expenses'],
    queryFn: fetchExpense,
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
    useExpense,
    useBuckets,
    useGoals,
};