import PoemCollection from '../components/Poem/PoemCollection';

const TangCollection = () => {
    return (
        <PoemCollection
            title="宋词三百首"
            endpoint="poems/song-300"
            type="poetry"
        />
    );
};

export default TangCollection;