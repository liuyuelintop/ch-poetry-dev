import ScrollButton from './ScrollButton';

const ScrollToUp = () => {
    return (
        <ScrollButton direction="up" threshold={300} className="fixed bottom-4 right-4" />
    );
};

export default ScrollToUp;
