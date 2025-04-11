import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchModelChoices } from 'services/budgetService'

const BudgetCategoriesContext = createContext();

export const BudgetCategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetchModelChoices();
        setCategories({
          income: response.income_categories,
          frequency: response.income_frequency,
          expenses: response.expense_categories,
          goals: response.goal_categories
        });
      } catch (err) {
        setError(err.message || 'Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <BudgetCategoriesContext.Provider value={{ categories, loading, error }}>
      {children}
    </BudgetCategoriesContext.Provider>
  );
};

export const useCategories = () => useContext(BudgetCategoriesContext);