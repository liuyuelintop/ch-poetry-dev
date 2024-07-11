import { useState } from 'react';
import useSearch from '../hooks/useSearch';
import PoemList from '../components/Poem/PoemList';
import Pagination from '../components/Pagination';
import SearchForm from '../components/SearchForm';

const SearchPage = () => {
    const [initialParams, setInitialParams] = useState({ type: 'poetry', author: '', title: '', rhythmic: '', chapter: '', section: '' });
    const { poems, loading, error, totalPages, currentPage, setParams, setPage } = useSearch(initialParams);

    const handleSearch = (newParams) => {
        setInitialParams(newParams);
        setParams(newParams);
        setPage(1);
    };

    const handlePageChange = (page) => {
        setPage(page);
    };

    return (
        <div className="mt-32 flex flex-col items-center justify-center px-8">
            <SearchForm setParams={handleSearch} />
            <div className="w-full max-w-2xl">
                {loading && <div>Loading...</div>}
                {error && <div>{error}</div>}
                {!loading && !error && poems.length > 0 && (
                    <>
                        <PoemList poems={poems} type={initialParams.type} />
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                    </>
                )}
                {!loading && !error && poems.length === 0 && (
                    <div className="flex mt-12 items-center justify-center text-2xl">
                        No results found
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPage;