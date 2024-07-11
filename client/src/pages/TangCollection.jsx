import PoemCollection from '../components/Poem/PoemCollection';

const TangCollection = () => {
    return (
        <PoemCollection
            title="唐诗三百首"
            endpoint="poems/tang-300"
            type="poetry"
        />
    );
};

export default TangCollection;