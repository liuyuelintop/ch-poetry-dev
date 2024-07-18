import { useState, useEffect } from 'react';

/**
 * ScrollButton Component
 * 
 * A reusable button component that scrolls the page to the top or bottom
 * based on the `direction` prop. The button appears when the user scrolls
 * past a certain threshold.
 * 
 * @param {string} direction - The direction to scroll ("up" or "down").
 * @param {number} threshold - The scroll threshold to show the button.
 * @param {string} className - Additional classes for the button container.
 */
const ScrollButton = ({ direction, threshold, className }) => {
    // State to control the visibility of the button
    const [isVisible, setIsVisible] = useState(false);

    // Toggle button visibility based on scroll position
    const toggleVisibility = () => {
        if (direction === 'up') {
            // Show button if scrolled past the threshold
            setIsVisible(window.scrollY > threshold);
        } else {
            // Show button if not at the bottom threshold
            setIsVisible(window.scrollY < document.documentElement.scrollHeight - window.innerHeight - threshold);
        }
    };

    // Scroll to the top or bottom of the page
    const scrollTo = () => {
        window.scrollTo({
            top: direction === 'up' ? 0 : document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    };

    // Add and remove scroll event listener
    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, [direction, threshold]);

    return (
        <div className={className}>
            {isVisible && (
                <button
                    onClick={scrollTo}
                    className="p-3 bg-green-400 text-white rounded-full shadow-md hover:bg-green-600 focus:outline-none"
                >
                    {direction === 'up' ? '↑' : '↓'}
                </button>
            )}
        </div>
    );
};

export default ScrollButton;
