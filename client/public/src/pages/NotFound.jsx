import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold mb-4">404 - 页面未找到</h1>
            <p className="text-lg text-gray-700 mb-4">对不起，您访问的页面不存在。</p>
            <Link to="/" className="text-blue-500 hover:underline">
                返回首页
            </Link>
        </div>
    );
};

export default NotFound;