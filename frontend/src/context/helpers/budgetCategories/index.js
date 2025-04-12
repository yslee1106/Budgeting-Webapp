import React, { createContext, useContext, } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchModelChoices } from 'services/budget/get';

const BudgetCategoriesContext = createContext();

export const BudgetCategoriesProvider = ({ children }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['modelChoices'],
    queryFn: fetchModelChoices,
    initialData: {
      income_categories: [],
      income_frequency: [],
      expense_categories: [],
      goal_categories: []
    }
  });

  return (
    <BudgetCategoriesContext.Provider value={{
      categories: {
        income: data.income_categories,
        frequency: data.income_frequency,
        expenses: data.expense_categories,
        goals: data.goal_categories
      },
      loading: isLoading,
      error
    }}>
      {children}
    </BudgetCategoriesContext.Provider>
  );
};

export const useCategories = () => useContext(BudgetCategoriesContext);