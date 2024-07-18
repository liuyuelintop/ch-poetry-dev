import { NavLink } from 'react-router-dom';

const SearchPage = () => {
    return (
        <div className='flex flex-col items-center justify-center mt-20 p-4'>
            <h1 className='text-2xl font-bold mb-8 text-neutral-900'>诗词搜索</h1>
            <div className='space-y-4'>
                <NavLink
                    to='/search-poetry'
                    className='block w-64 px-4 py-2 text-center text-white bg-blue-500 rounded shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75'
                >
                    搜索唐诗宋词
                </NavLink>
                <NavLink
                    to='/search-shijing'
                    className='block w-64 px-4 py-2 text-center text-white bg-green-500 rounded shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75'
                >
                    搜索诗经
                </NavLink>
            </div>
        </div>
    );
};

export default SearchPage;