import { Link } from 'react-router-dom';

const NavLink = ({ to, children }) => {
    return (
        <Link
            to={to}
            className="hover:underline underline-offset-8 decoration-2 decoration-neutral-700"
        >
            {children}
        </Link>
    );
};

export default NavLink;