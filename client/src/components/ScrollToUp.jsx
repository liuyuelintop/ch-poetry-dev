import { useState, useEffect } from 'react';

const ScrollToUp = () => {
    const [isVisible, setIsVisible] = useState(false);

    // 显示或隐藏按钮
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // 滚动到顶部
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <div className="fixed bottom-4 right-4">
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="p-3 bg-green-400 text-white rounded-full shadow-md hover:bg-green-600 focus:outline-none"
                >
                    ↑
                </button>
            )}
        </div>
    );
};

export default ScrollToUp;