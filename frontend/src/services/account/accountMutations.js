import { useOptimisticMutation } from "services/mutation";
import { addTransaction } from 'services/account/requests/post';

const useAddTransaction = (currentPeriod) => {
    const bucketKey = ['buckets', currentPeriod];
    const sessionKey = ['sessions', currentPeriod];

    return useOptimisticMutation(
        addTransaction,
        [bucketKey, sessionKey],
        {
            bucketKey: (oldBuckets, transaction) => {
                return oldBuckets.map((bucket) => {
                    if (bucket.expense === transaction.bucket.expense) {
                        return {
                            ...bucket,
                            current_amount: bucket.current_amount + transaction.amount
                        };
                    }
                    return bucket;
                })
            },
            sessionKey: (oldSessions, transaction) => {
                return oldSessions.map((session) => {
                    if (session.period === currentPeriod) {
                        return {
                            ...session,
                            total_expense: session.total_expense + transaction.amount,
                            available_funds: session.available_funds - transaction.amount,
                        };
                    }
                    return session;
                })
            },
        }
    )
}

export {
    useAddTransaction,
};