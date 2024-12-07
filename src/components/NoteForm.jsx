import React from 'react'

const NoteForm = ({ title, setTitle, body, setBody, errors, onSubmit, isEditing }) => {
    return (
        <form onSubmit={onSubmit}>
            <div className="mb-4">
                <label htmlFor="title" className="block font-medium text-gray-700 mb-2">
                    Note Title
                </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={`border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter note title"
                    required
                />
                {errors.title && <p className="text-red-500 text-xs italic">{errors.title}</p>}
            </div>
            <div className="mb-4">
                <label htmlFor="body" className="block font-medium text-gray-700 mb-2">
                    Note Body
                </label>
                <textarea
                    id="body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows="4"
                    className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 border-gray-300"
                    placeholder="Enter note text"
                />
            </div>
            <div className="flex justify-between">
                <a href="/notes" className="text-blue-500 hover:text-blue-700">
                    Back
                </a>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    {isEditing ? 'Save' : 'Create'}
                </button>
            </div>
        </form>
    );
};

export default NoteForm