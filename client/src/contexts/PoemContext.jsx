import React, { createContext, useContext, useState } from 'react';
import useFetchPoems from '../hooks/useFetchPoems';

const PoemContext = createContext();

export const usePoemContext = () => {
    return useContext(PoemContext);
};

export const PoemProvider = ({ children }) => {
    const [searchParams, setSearchParams] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const poemsData = useFetchPoems(searchParams, currentPage, limit);

    const value = {
        poems: poemsData.poems,
        loading: poemsData.loading,
        error: poemsData.error,
        totalPages: poemsData.totalPages,
        currentPage: poemsData.currentPage,
        setParams: setSearchParams,
        setPage: setCurrentPage,
        setLimit: setLimit,
    };

    return <PoemContext.Provider value={value}>{children}</PoemContext.Provider>;
};