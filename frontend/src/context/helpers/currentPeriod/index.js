import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchLatestSession } from 'services/budget/requests/get';

const CurrentPeriodContext = createContext(null);

export const CurrentPeriodProvider = ({ children }) => {
    // fetchLatestSession should return the latest session with a period field.
    const { data: latestSession } = useQuery({
        queryKey: ['latestSession'],
        queryFn: fetchLatestSession
    });

    const currentPeriod = latestSession ? latestSession[0]?.period : null;  

    return (
        <CurrentPeriodContext.Provider value={currentPeriod}>
            {children}
        </CurrentPeriodContext.Provider>
    );
};

export const useCurrentPeriod = () => {
    return useContext(CurrentPeriodContext);
};