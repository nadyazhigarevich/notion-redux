import React from 'react'
import InputField from './InputField'
import { Link, useLocation } from 'react-router-dom'

const Form = ({ title, fields, onSubmit, errors }) => {
    const location = useLocation()
    const isLoginPage = location.pathname === '/login'

    return (
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
            <article className="prose lg:prose-xl">
                <h1 className="mb-6">{title}</h1>
                <form onSubmit={onSubmit} noValidate>
                    {fields.map(({ id, label, type, value, onChange, placeholder }) => (
                        <InputField
                            key={id}
                            id={id}
                            label={label}
                            type={type}
                            value={value}
                            onChange={onChange}
                            error={errors[id] || (id === 'password' && (errors.invalid || errors.server))}
                            placeholder={placeholder}
                        />
                    ))}
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                    >
                        {title}
                    </button>
                </form>
                <p className="mt-4 text-center">
                    {isLoginPage ? (
                        <>
                            Don't have an account? <Link to="/signup" className="text-blue-500 underline">Sign up</Link>
                        </>
                    ) : (
                        <>
                            Already have an account? <Link to="/login" className="text-blue-500 underline">Log in</Link>
                        </>
                    )}
                </p>
            </article>
        </div>
    )
}

export default Form