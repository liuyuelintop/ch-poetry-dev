import { useState } from 'react';
import Pagination from '../components/Pagination/Pagination.jsx';
import useFetchSongPoetry from '../hooks/useFetchSongPoetry.js';
import PoemList from '../components/Poem/PoemList.jsx';

const SongPoetryPage = () => {
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data, error, isLoading } = useFetchSongPoetry(page, limit);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const { poems, currentPage, totalPages } = data;

    return (
        <div className='flex flex-col mx-auto justify-center items-center'>
            <h1 className='mt-10 text-bold text-neutral-900 text-2xl lg:text-4xl'>宋词三百首</h1>
            <PoemList poems={poems} type="poetry" />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
}

export default SongPoetryPage;