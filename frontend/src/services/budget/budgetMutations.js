import { useOptimisticMutation } from "services/mutation";
import { createGoal, createExpense } from "services/budget/requests/post";
import { patchGoalCurrentAmount } from "services/budget/requests/patch";
import { deleteGoal, deleteExpense } from "services/budget/requests/delete";

import { useCurrentPeriod } from "context/helpers/currentPeriod";

const useCreateExpense = () => {
    const currentPeriod = useCurrentPeriod()
    const bucketKey = ['buckets', currentPeriod];

    return useOptimisticMutation(
        createExpense,
        [bucketKey, /*['expenses']*/],
        {
            bucketKey: (oldBuckets, newExpense) => {
                return [
                    ...oldBuckets,
                    {
                        ...newExpense,
                        current_amount: 0.00,
                    }
                ];
            },
            /*['expenses']: (oldExpenses, newExpense) => {
                return [...oldExpenses, newExpense];
            }*/
        },
    );
};

const useDeleteExpense = () => {
    const currentPeriod = useCurrentPeriod();
    const bucketKey = ['buckets', currentPeriod];

    return useOptimisticMutation(
        deleteExpense,
        [bucketKey],
        {
            bucketKey: (oldBuckets, variables) => {
                return oldBuckets.filter(bucket => bucket.expense !== variables.expense)
            }
        },
        [bucketKey],
    )
}

const useCreateGoal = () => {
    return useOptimisticMutation(
        createGoal,
        [['goals']],
        {
            ['goals']: (oldGoals, newGoal) => {
                return [
                    ...oldGoals,
                    {
                        ...newGoal,
                        current_amount: 0.00,
                    }
                ];
            }
        },
        [['goals']]
    )
};

const usePatchGoalCurrentAmount = () => {
    const currentPeriod = useCurrentPeriod();
    const sessionKey = ['sessions', currentPeriod];

    return useOptimisticMutation(
        patchGoalCurrentAmount,
        [['goals'], sessionKey],
        {
            ['goals']: (oldGoals, updatedGoal) => {
                return oldGoals.map((goal) => {
                    if (goal.id === updatedGoal.goal.id) {
                        return {
                            ...goal,
                            current_amount: updatedGoal.updatedTotal,
                        };
                    }
                    return goal;
                });
            },
            sessionKey: (oldSession, updatedGoal) => {
                return {
                    ...oldSession,
                    available_funds: updatedGoal.type === 'increase' ?
                        oldSession.available_funds - updatedGoal.amount :
                        oldSession.available_funds + updatedGoal.amount,
                    total_funds: updatedGoal.type === 'increase' ?
                        oldSession.total_funds - updatedGoal.amount :
                        oldSession.total_funds + updatedGoal.amount,
                }
            }
        },
        [['goals']]
    );
};

const useDeleteGoal = () => {
    return useOptimisticMutation(
        deleteGoal,
        [['goals']],
        {
            ['goals']: (oldGoals, variables) => {
                return oldGoals.filter(goal => goal.id !== variables.id);
            }
        },
        [['goals']]
    )
}

export {
    useCreateExpense,
    useDeleteExpense,
    useCreateGoal,
    usePatchGoalCurrentAmount,
    useDeleteGoal,
};