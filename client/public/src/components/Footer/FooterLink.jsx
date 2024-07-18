const FooterLink = ({ url, children }) => {
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-1  hover:text-blue-600"
        >
            {children}
        </a>
    );
};

export default FooterLink;
