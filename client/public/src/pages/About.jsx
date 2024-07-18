const About = () => {
    return (
        <div className="flex flex-col flex-wrap items-center min-h-screen bg-gray-100 p-4">
            <h1 className="mt-20 text-3xl font-bold mb-8">关于</h1>
            <p className="text-lg text-gray-700 max-w-prose mb-4">
                这是一个关于中国古诗词的网站。我致力于传播和分享中国古代文化，通过这个网站，您可以浏览和搜索唐、宋、元、明、清等各个朝代的经典诗词。希望您能在这里找到喜爱的作品，并感受到古诗词的美。
            </p>
            <p className="text-lg text-gray-700 max-w-prose mb-4">
                出于对中国古诗词的喜爱以及对传统文化的传播，我创建了这个小项目。特别鸣谢
                <a href="https://github.com/chinese-poetry/chinese-poetry" className="text-blue-500 hover:underline m-1">
                    chinese-poetry
                </a>
                项目以及所有贡献者的努力收集和整理了数据，这样我才可以处于兴趣构建了这个项目。
            </p>
            <p className="text-lg text-gray-700 max-w-prose mb-4">
                由于我的能力有限，项目肯定存在很多值得优化的空间，欢迎各位来指正和贡献。希望通过大家的努力，让更多的人了解和喜爱中国古诗词。
            </p>
            <p className="text-lg text-gray-700 max-w-prose mb-4">
                如果你有任何建议或想法，欢迎通过
                <a href="mailto:liuyuelintop@gmail.com" className="text-blue-500 hover:underline m-1">
                    邮件
                </a>
                与我联系。
            </p>
        </div>
    );
};

export default About;