import ScrollButton from './ScrollButton';

const ScrollToBottom = () => {
    return (
        <ScrollButton direction="down" threshold={300} className="fixed bottom-4 right-16" />
    );
};

export default ScrollToBottom;
