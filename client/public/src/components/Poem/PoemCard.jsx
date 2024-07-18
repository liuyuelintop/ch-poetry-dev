import { BiLike } from "react-icons/bi";

const PoemCard = ({ poem, type }) => {

    return (
        <div className="max-w-xl w-full my-4">
            <div className="hover:border-green-300 border border-gray-300 bg-white rounded-lg p-8 flex flex-col justify-center items-center shadow-lg">
                <div className="flex flex-col items-center justify-center mb-4">
                    <div className="mt-4 text-neutral-800 font-bold text-lg md:text-xl mb-2">
                        {poem.title || poem.rhythmic}
                    </div>
                    <p className="text-slate-500 text-sm md:text-lg m-2">
                        {poem.author}
                    </p>
                    {type === 'shijing' && (
                        <div className="text-slate-500 text-sm md:text-lg m-2">
                            {poem.chapter} - {poem.section}
                        </div>
                    )}
                </div>
                <div className='flex flex-col items-center justify-center'>
                    {poem.paragraphs && poem.paragraphs.map((paragraph, index) => (
                        <p key={index} className="text-neutral-800 text-base md:text-xl my-4 ">
                            {paragraph}
                        </p>
                    ))}
                    {poem.content && poem.content.map((line, index) => (
                        <p key={index} className="text-neutral-800 text-base md:text-xl my-4 ">
                            {line}
                        </p>
                    ))}
                </div>
                <button className="w-24 flex justify-center items-center py-2 bg-green-200 text-neutral-700 hover:text-white rounded-lg hover:bg-green-700">
                    <BiLike className='mr-2' /> {poem.like}
                </button>
            </div>
        </div>
    );
};

export default PoemCard;