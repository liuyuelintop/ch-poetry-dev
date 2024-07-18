import { useState } from 'react';
import SearchPoetryPage from './SearchPoetryPage.jsx';
import Pagination from '../../../components/Pagination/Pagination.jsx';
import useSearchPoetry from '../../../hooks/useSearchPoetry.js';

const PoetrySearch = () => {
    const [queryParams, setQueryParams] = useState({ author: '', title: '', page: 1 });

    const { data, error, isLoading } = useSearchPoetry(queryParams);

    const handleSearch = (newQueryParams) => {
        setQueryParams({ ...newQueryParams, page: 1 });
    };

    const handlePageChange = (newPage) => {
        setQueryParams((prevParams) => ({ ...prevParams, page: newPage }));
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const { totalPages } = data;

    return (
        <div className="flex flex-col items-center">
            <SearchPoetryPage queryParams={queryParams} onSearch={handleSearch} data={data} />
            <Pagination
                currentPage={queryParams.page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default PoetrySearch;