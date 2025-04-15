import { useOptimisticMutation } from "services/mutation";
import { createGoal, createExpense } from "services/budget/requests/post";

const useCreateExpense = (currentSession) => {
    return useOptimisticMutation(
        createExpense,
        [['buckets', currentSession.id], /*['expenses']*/],
        {
            ['buckets']: (oldBuckets, newExpense) => {
                return [
                    ...oldBuckets,
                    {
                        ...newExpense,
                        current_amount: 0.00,
                        percentage: 0, 
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
                        percentage: 0,
                    }
                ];
            }
        }
    )
};

export {
    useCreateExpense,
    useCreateGoal,
};