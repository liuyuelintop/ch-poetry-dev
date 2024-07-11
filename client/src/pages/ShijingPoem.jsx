import PoemCollection from '../components/Poem/PoemCollection';

const ShijingPoem = () => {
    return (
        <PoemCollection
            title="诗经"
            endpoint="shijing"
            type="shijing"
        />
    );
};

export default ShijingPoem;