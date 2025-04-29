import { useQueryClient } from "@tanstack/react-query";

import { useOptimisticMutation } from "services/mutation";
import { createGoal, createExpense, createIncome, injectIncome, subtractIncome } from "services/budget/requests/post";
import { patchGoalCurrentAmount, patchIncome, patchGoal } from "services/budget/requests/patch";
import { deleteGoal, deleteExpense, deleteIncome } from "services/budget/requests/delete";

import { useCurrentPeriod } from "context/helpers/currentPeriod";

const useCreateIncome = () => {
    return useOptimisticMutation(
        createIncome,
        [['income']],
        {
            ['income']: (oldIncome, newIncome) => {
                return [
                    ...oldIncome,
                    {
                        newIncome
                    }
                ];
            },
        },
        [['income']],
    )
}

const usePatchIncome = () => {
    return useOptimisticMutation(
        patchIncome,
        [['income']],
        {
            ['income']: (oldIncome, updatedIncome) => {
                return oldIncome.map((income) =>
                    income.id === updatedIncome.id
                        ? { ...income, ...updatedIncome }
                        : income
                );
            },
        },
        [['income']]
    )
};

const useReceiveIncome = () => {
    const currentPeriod = useCurrentPeriod();
    const incomeKey = ['income'];
    const sessionKey = ['sessions', currentPeriod];

    return useOptimisticMutation(
        injectIncome,
        [incomeKey, sessionKey],
        {
            sessionKey: (oldSession, incomeReceived) => {
                return {
                    ...oldSession,
                    available_funds: oldSession.available_funds + incomeReceived.amount,
                    total_funds: oldSession.total_funds + incomeReceived.amount,
                }
            }
        },
        [incomeKey, sessionKey]
    )
};

const useRetractIncome = () => {
    const queryClient = useQueryClient();

    const sessionQueries = queryClient.getQueriesData(['sessions'])

    const sessionKeys = sessionQueries.map(([key]) => key);
    const incomeKey = ['income'];

    return useOptimisticMutation(
        subtractIncome,
        [incomeKey, ...sessionKeys],
        {},
        [incomeKey, ...sessionKeys]
    )
}

const useDeleteIncome = () => {
    return useOptimisticMutation(
        deleteIncome,
        [['income']],
        {
            ['income']: (oldIncome, variables) => {
                return oldIncome.filter(income => income.id !== variables.id)
            }
        },
        [['income']]
    )
}

const useCreateExpense = () => {
    const currentPeriod = useCurrentPeriod();
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
        [bucketKey],
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

const usePatchGoal = () => {
    return useOptimisticMutation(
        patchGoal,
        [['goals']],
        {
            ['goals']: (oldGoals, updatedGoal) => {
                return oldGoals.map((goal) =>
                    goal.id === updatedGoal.id
                        ? { ...goal, ...updatedGoal }
                        : goal
                );
            },
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
    useCreateIncome,
    useReceiveIncome,
    useRetractIncome,
    usePatchIncome,
    useDeleteIncome,
    useCreateExpense,
    useDeleteExpense,
    useCreateGoal,
    usePatchGoal,
    usePatchGoalCurrentAmount,
    useDeleteGoal,
};