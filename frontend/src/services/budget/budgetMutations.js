import { useOptimisticMutation } from "services/mutation";
import { createGoal, createExpense } from "services/budget/requests/post";
import { patchGoalCurrentAmount } from "services/budget/requests/patch";

const useCreateExpense = (currentPeriod) => {
    return useOptimisticMutation(
        createExpense,
        [['buckets', currentPeriod], /*['expenses']*/],
        {
            ['buckets']: (oldBuckets, newExpense) => {
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
        }
    )
};

const usePatchGoalCurrentAmount = (latestSession) => {
    return useOptimisticMutation(
        patchGoalCurrentAmount,
        [['goals'], ['sessions']],
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
            // ['sessions']: (oldSession, updatedGoal) => {
            //     if (oldSession === latestSession) {
            //         return {
            //             ...session,
            //             available_funds: updatedGoal.type === 'increase' ?
            //                 session.available_funds - updatedGoal.amount :
            //                 session.available_funds + updatedGoal.amount,
            //             total_funds: updatedGoal.type === 'increase' ?
            //                 session.total_funds - updatedGoal.amount :
            //                 session.total_funds + updatedGoal.amount,
            //         }
            //     }
            // }
        }
    );
};

export {
    useCreateExpense,
    useCreateGoal,
    usePatchGoalCurrentAmount,
};