import PoemList from '../components/Poem/PoemList.jsx';
import useFetchRandomPoems from '../hooks/useFetchRandomPoems.js';
const Home = () => {
    const { data, error, isLoading } = useFetchRandomPoems();
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error: {error.message}</div>
    }
    const { poems } = data;
    return (
        <div className='flex flex-col mx-auto justify-center items-center'>
            <h1 className='mt-10 text-bold text-neutral-900 text-2xl lg:text-4xl'>唐宋经典诗词 - 随机 10 首 </h1>
            <PoemList poems={poems} type="poetry" />
        </div>

    )
}
export default Home;