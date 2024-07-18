import React, { useCallback, useMemo } from 'react';

const generatePageNumbers = (currentPage, totalPages) => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) {
            pageNumbers.push('...');
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            pageNumbers.push('...');
        }
        pageNumbers.push(totalPages);
    }

    return pageNumbers;
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = useCallback((page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    }, [onPageChange, totalPages]);

    const pageNumbers = useMemo(() => generatePageNumbers(currentPage, totalPages), [currentPage, totalPages]);

    return (
        <div className="flex flex-wrap justify-center items-center my-4">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="mx-1 px-3 py-1 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
                aria-label="Previous Page"
            >
                上一页
            </button>
            {pageNumbers.map((page, index) => (
                <button
                    key={index}
                    onClick={() => handlePageChange(page)}
                    disabled={page === '...'}
                    className={`mx-1 px-3 py-1 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
                        } ${page === '...' ? 'cursor-default' : ''}`}
                    aria-disabled={page === '...'}
                >
                    {page}
                </button>
            ))}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="mx-1 px-3 py-1 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
                aria-label="Next Page"
            >
                下一页
            </button>
        </div>
    );
};

export default React.memo(Pagination);