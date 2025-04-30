// Create a new file services/budget/queryHooks.js
import { useQuery } from '@tanstack/react-query';
import { fetchSessionByPeriod, fetchBucketByPeriod, fetchGoals, fetchIncome, fetchExpense } from 'services/budget/requests/get';

const useSessions = (period) => useQuery({
    queryKey: ['sessions', period],
    queryFn: () => fetchSessionByPeriod(period),
    enabled: !!period,
});

const useIncome = () => useQuery({
    queryKey: ['income'],
    queryFn: fetchIncome,
});

const useExpense = () => useQuery({
    queryKey: ['expense'],
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