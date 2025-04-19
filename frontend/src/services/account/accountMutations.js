import { useOptimisticMutation } from "services/mutation";
import { addTransaction } from 'services/account/requests/post';

const useAddTransaction = (currentPeriod) => {
    return useOptimisticMutation(
        addTransaction,
        [['buckets', currentPeriod], ['sessions', currentPeriod]],
        {
            ['buckets']: (oldBuckets, transaction) => {
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
            ['sessions']: (oldSessions, transaction) => {
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