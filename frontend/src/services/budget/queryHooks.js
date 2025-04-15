// Create a new file services/budget/queryHooks.js
import { useQuery } from '@tanstack/react-query';
import { fetchSessions, fetchBucketBySession, fetchGoals, fetchIncome, fetchExpense } from 'services/budget/requests/get';

const useSessions = () => useQuery({
    queryKey: ['sessions'],
    queryFn: fetchSessions,
});

const useIncome = () => useQuery({
    queryKey: ['income'],
    queryFn: fetchIncome,
});

const useExpense = () => useQuery({
    queryKey: ['expenses'],
    queryFn: fetchExpense,
});

const useBuckets = (sessionId) => useQuery({
    queryKey: ['buckets', sessionId],
    queryFn: () => fetchBucketBySession(sessionId),
    enabled: !!sessionId, // Only fetch when sessionId exists
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