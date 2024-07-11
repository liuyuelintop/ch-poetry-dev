import { useState } from 'react';
import axios from 'axios';
import PoemList from './Poem/PoemList';
import Pagination from './Pagination';

const Search = () => {
    const [searchParams, setSearchParams] = useState({
        author: '',
        title: '',
    });
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams({ ...searchParams, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchSearchResults(currentPage);
    };

    const fetchSearchResults = async (page) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('http://localhost:5001/api/poems/search', {
                ...searchParams,
                page,
            });
            setResults(response.data.poems);
            setCurrentPage(response.data.currentPage);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            setError('There was an error searching for the poems!');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchSearchResults(page);
    };

    return (
        <div className="mt-32 flex flex-col items-center justify-center px-8">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col md:flex-row md:gap-4 w-full max-w-lg"
            >
                <input
                    name="author"
                    placeholder="Author"
                    onChange={handleChange}
                    className="mb-2 p-2 border border-gray-300 rounded max-w-lg w-full"
                />
                <input
                    name="title"
                    placeholder="Title"
                    onChange={handleChange}
                    className="mb-2 p-2 border border-gray-300 rounded w-full"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Search
                </button>
            </form>
            <div className="w-full max-w-2xl">
                {loading && <div>Loading...</div>}
                {error && <div>{error}</div>}
                {!loading && !error && (
                    <>
                        <PoemList poems={results} type="search" />
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                    </>
                )}
            </div>
        </div>
    );
};

export default Search;