import { useState } from 'react';
import { useQuery } from 'react-query';
import { searchShijing } from '../../../api/poem.js';
import SearchShijingPage from './SearchShijingPage.jsx';
import Pagination from '../../../components/Pagination/Pagination.jsx';
import useSearchShijing from '../../../hooks/useSearchShijing.js';

const ShijingSearch = () => {
    const [queryParams, setQueryParams] = useState({ title: '', chapter: '', section: '', page: 1 });

    const { data, error, isLoading } = useSearchShijing(queryParams);

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
            <SearchShijingPage queryParams={queryParams} onSearch={handleSearch} data={data} />
            <Pagination
                currentPage={queryParams.page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default ShijingSearch;