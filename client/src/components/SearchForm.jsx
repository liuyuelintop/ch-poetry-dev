import React, { useState, useEffect, useCallback } from 'react';

const SearchForm = ({ setParams }) => {
    const [formValues, setFormValues] = useState({ type: 'poetry-tang', author: '', title: '', rhythmic: '', chapter: '', section: '' });

    useEffect(() => {
        // 重置无关字段
        setFormValues((prevValues) => {
            const newValues = { ...prevValues };
            if (prevValues.type.startsWith('poetry')) {
                newValues.chapter = '';
                newValues.section = '';
                if (prevValues.type === 'poetry-song') {
                    newValues.title = '';
                } else {
                    newValues.rhythmic = '';
                }
            } else if (prevValues.type === 'shijing') {
                newValues.author = '';
                newValues.rhythmic = '';
            }
            return newValues;
        });
    }, [formValues.type]);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => {
            if (name === 'type') {
                return { ...prevValues, type: value, author: '', title: '', rhythmic: '', chapter: '', section: '' };
            }
            return { ...prevValues, [name]: value };
        });
    }, []);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        const params = { ...formValues };
        if (formValues.type.startsWith('poetry')) {
            params.type = 'poetry';
            params.dynasty = formValues.type.split('-')[1];
        } else {
            params.dynasty = '';
        }
        setParams(params);
    }, [setParams, formValues]);

    return (
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row md:gap-4 w-full max-w-lg">
            <select
                name="type"
                onChange={handleChange}
                value={formValues.type}
                className="mb-2 p-2 border border-gray-300 rounded max-w-lg w-full"
            >
                <option value="poetry-tang">唐诗</option>
                <option value="poetry-song">宋词</option>
                <option value="shijing">诗经</option>
            </select>
            {formValues.type.startsWith('poetry') && (
                <>
                    <input
                        name="author"
                        placeholder="Author"
                        onChange={handleChange}
                        value={formValues.author}
                        className="mb-2 p-2 border border-gray-300 rounded max-w-lg w-full"
                    />
                    {formValues.type === 'poetry-tang' && (
                        <input
                            name="title"
                            placeholder="Title"
                            onChange={handleChange}
                            value={formValues.title}
                            className="mb-2 p-2 border border-gray-300 rounded w-full"
                        />
                    )}
                    {formValues.type === 'poetry-song' && (
                        <input
                            name="rhythmic"
                            placeholder="Rhythmic"
                            onChange={handleChange}
                            value={formValues.rhythmic}
                            className="mb-2 p-2 border border-gray-300 rounded w-full"
                        />
                    )}
                </>
            )}
            {formValues.type === 'shijing' && (
                <>
                    <input
                        name="title"
                        placeholder="Title"
                        onChange={handleChange}
                        value={formValues.title}
                        className="mb-2 p-2 border border-gray-300 rounded w-full"
                    />
                    <input
                        name="chapter"
                        placeholder="Chapter"
                        onChange={handleChange}
                        value={formValues.chapter}
                        className="mb-2 p-2 border border-gray-300 rounded w-full"
                    />
                    <input
                        name="section"
                        placeholder="Section"
                        onChange={handleChange}
                        value={formValues.section}
                        className="mb-2 p-2 border border-gray-300 rounded w-full"
                    />
                </>
            )}
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Search
            </button>
        </form>
    );
};

export default SearchForm;