import { Link } from 'react-router-dom';
import NavLink from './NavLink'; // 导入NavLink组件

const Navbar = () => {
    return (
        <nav className="fixed w-full z-50 top-0 left-0 backdrop-filter backdrop-blur-lg bg-opacity-30 bg-green-200">
            <div className="text-neutral-800 container mx-auto flex flex-wrap sm:justify-between p-5 flex-col md:flex-row items-center">
                <Link to="/" className="flex title-font font-medium items-center mb-4 md:mb-0">
                    <span className="ml-3 text-xl">中国古诗词</span>
                </Link>
                <div className="flex flex-nowrap gap-5">
                    <NavLink to="/tang">唐</NavLink>
                    <NavLink to="/song">宋</NavLink>
                    <NavLink to="/shi_jing">诗经</NavLink>
                    <NavLink to="/search">🔍</NavLink>
                    <NavLink to="/about">关于</NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;