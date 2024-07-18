import PoemList from "../../../components/Poem/PoemList";

const SearchShijingPage = ({ queryParams, onSearch, data }) => {
    const handleSearch = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newQueryParams = {
            author: formData.get('title'),
            chapter: formData.get('chapter'),
            section: formData.get('section'),
        };
        onSearch(newQueryParams);
    };

    const { poems } = data;

    return (
        <div className='flex flex-col mx-auto justify-center items-center'>
            <h1 className='mt-10 text-bold text-neutral-900 text-2xl lg:text-4xl'>搜索诗经</h1>
            <form onSubmit={handleSearch} className='flex flex-col mx-auto w-full max-w-2xl mb-4'>
                <div className='flex flex-col mb-4'>
                    <label htmlFor='title' className='mb-2'>标题</label>
                    <input type='text' id='title' name='title' className='p-2 border border-gray-300 rounded' />
                </div>
                <div className='flex flex-col mb-4'>
                    <label htmlFor='chapter' className='mb-2'>Chapter</label>
                    <input type='text' id='chapter' name='chapter' className='p-2 border border-gray-300 rounded' />
                </div>
                <div className='flex flex-col mb-4'>
                    <label htmlFor='section' className='mb-2'>Section</label>
                    <input type='text' id='section' name='section' className='p-2 border border-gray-300 rounded' />
                </div>
                <button type='submit' className='p-2 bg-blue-500 text-white rounded'>搜索</button>
            </form>
            <PoemList poems={poems} type="shijing" />
        </div>
    );
};

export default SearchShijingPage;