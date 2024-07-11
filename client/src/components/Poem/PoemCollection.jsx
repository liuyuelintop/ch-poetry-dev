import { useState } from 'react';
import useGetPoems from '../../hooks/useGetPoems';
import useLikePoem from '../../hooks/useLikePoem';
import PoemList from './PoemList';
import Pagination from '../Pagination';

const PoemCollection = ({ title, endpoint, type }) => {
    const { poems, loading, error, currentPage, totalPages, setPage, setPoems } = useGetPoems(endpoint);
    const likePoem = useLikePoem();

    const handlePageChange = (page) => {
        setPage(page);
    };

    const handleLike = async (id) => {
        const newLikeCount = await likePoem(id);
        if (newLikeCount !== null) {
            setPoems((prevPoems) =>
                prevPoems.map((poem) =>
                    poem._id === id ? { ...poem, like: newLikeCount } : poem
                )
            );
        }
    };

    if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
    if (error) return <div className="flex items-center justify-center h-screen">{error}</div>;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-3xl font-bold my-4">{title}</h2>
            {!loading && !error && poems.length > 0 && (
                <>
                    <PoemList poems={poems} type={type} onLike={handleLike} />
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </>
            )}
        </div>
    );
};

export default PoemCollection;