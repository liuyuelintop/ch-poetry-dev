const Footer = () => {
    return (
        <footer className="text-neutral-500 py-4">
            <div className="container mx-auto flex flex-col items-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} 中国古诗词. All rights reserved.
                </p>
                <p className="text-sm mt-2">
                    Powered by <a href="https://github.com/chinese-poetry/chinese-poetry" className="text-neutral-800 text-bold hover:text-blue-700">ChinesePoetry</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;