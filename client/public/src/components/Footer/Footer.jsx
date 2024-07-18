import FooterLink from "./FooterLink";
const Footer = () => {
    return (
        <footer className="text-neutral-500 py-4">
            <div className="container mx-auto flex flex-col items-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()}
                    <FooterLink
                        url="https://github.com/liuyuelintop/mern-chinese-poetry">
                        中国古诗词
                    </FooterLink>
                    All rights reserved.
                </p>
                <p className="text-sm mt-2">
                    Powered by
                    <FooterLink url="https://github.com/chinese-poetry/chinese-poetry">
                        ChinesePoetry
                    </FooterLink>
                </p>
            </div>
        </footer>
    );
};

export default Footer;