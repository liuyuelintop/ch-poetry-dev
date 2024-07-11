import { useEffect, useState } from 'react';
import axios from 'axios';
import PoemCard from '../components/Poem/PoemCard';

const HomePage = () => {
    const [tangPoems, setTangPoems] = useState([]);
    const [songPoems, setSongPoems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPoems = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:5001/api/poems/random-poems');
                setTangPoems(response.data.tangPoems);
                setSongPoems(response.data.songPoems);
            } catch (error) {
                setError('There was an error fetching the poems!');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPoems();
    }, []);

    if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
    if (error) return <div className="flex items-center justify-center h-screen">{error}</div>;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-8">

            <section className="flex flex-col items-center w-full max-w-4xl mb-8">
                <h2 className="text-3xl font-bold mb-4">随机唐诗精选</h2>
                {tangPoems.map((poem) => (
                    <PoemCard key={poem._id} poem={poem} type="poetry" className="mb-4" />
                ))}
            </section>
            <section className="flex flex-col items-center w-full max-w-4xl">
                <h2 className="text-3xl font-bold mb-4">随机宋词精选</h2>
                {songPoems.map((poem) => (
                    <PoemCard key={poem._id} poem={poem} type="poetry" className="mb-4" />
                ))}
            </section>
        </div>
    );
};

export default HomePage;