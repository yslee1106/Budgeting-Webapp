import { useOptimisticMutation } from "services/mutation";
import { addTransaction } from 'services/account/requests/post';

import { useCurrentPeriod } from "context/helpers/currentPeriod";
import { deleteTransaction } from "services/account/requests/delete";

const useAddTransaction = () => {
    const currentPeriod = useCurrentPeriod()
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
            sessionKey: (oldSession, transaction) => {
                        return {
                            ...oldSession,
                            total_expense: oldSession.total_expense + transaction.amount,
                            available_funds: oldSession.available_funds - transaction.amount,
                        };
            },
        },
        [bucketKey],
    )
}

const useDeleteTransaction = (bucketId) => {
    const currentPeriod = useCurrentPeriod()

    const bucketKey = ['buckets', currentPeriod];
    const sessionKey = ['sessions', currentPeriod];
    const transactionKey = ['transactions', bucketId]

    return useOptimisticMutation(
        deleteTransaction,
        [bucketKey, sessionKey, transactionKey],
        {
            transactionKey: (oldTransactions, variables) => {
                return oldTransactions.filter(transaction => transaction.id !== variables.id)
            },
            bucketKey: (oldBuckets, variables) => {
                return oldBuckets.filter(bucket => bucket.expense !== variables.expense)
            },
            sessionKey: (oldSession, variables) => {
                return {
                    ...oldSession,
                    total_expense: oldSession.total_expense - variables.amount,
                    available_funds: oldSession.available_funds + variables.amount,
                };
            },
        },
        [transactionKey],
    )
}

export {
    useAddTransaction,
    useDeleteTransaction,
};