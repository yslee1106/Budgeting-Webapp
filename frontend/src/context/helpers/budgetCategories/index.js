import React, { createContext, useContext, } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchModelChoices } from 'services/budget/requests/get';

const BudgetCategoriesContext = createContext();

export const BudgetCategoriesProvider = ({ children }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['modelChoices'],
    queryFn: fetchModelChoices,
  });

  // Provide fallback values to prevent undefined errors
  const defaultCategories = {
    income: [],
    frequency: [],
    expenses: [],
    goals: [],
  };

  // Use data if available, otherwise use defaults·
  const categories = data
    ? {
      income: data.income_categories || [],
      frequency: data.income_frequency || [],
      expenses: data.expense_categories || [],
      goals: data.goal_categories || [],
    }
    : defaultCategories;

  return (
    <BudgetCategoriesContext.Provider value={{
      categories,
      loading: isLoading,
      error,
    }}>
      {children}
    </BudgetCategoriesContext.Provider>
  );
};

export const useCategories = () => useContext(BudgetCategoriesContext);