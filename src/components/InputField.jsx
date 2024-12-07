import React from 'react'

const InputField = ({ id, label, type, value, onChange, error, placeholder, required }) => {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-gray-700 font-bold mb-2">
                {label}
            </label>
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                className={`w-full p-3 rounded-md border ${error ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
                placeholder={placeholder}
                required={required}
            />
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </div>
    )
}

export default InputField