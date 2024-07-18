import PoemCard from './PoemCard';

const PoemList = ({ poems, type }) => {
    return (
        <div className="flex flex-col items-center w-full max-w-2xl justify-center min-h-screen py-4">
            {poems.map((poem) => (
                <PoemCard key={poem._id} poem={poem} type={type} className="mb-4" />
            ))}
        </div>
    );
};

export default PoemList;