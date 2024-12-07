import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md mx-auto">
                <article className="prose lg:prose-xl text-center">
                    <h1 className="mb-6 text-3xl">404 - Not Found</h1>
                    <p className="mb-4">Sorry, the page you are looking for does not exist.</p>
                    <p>
                        Go back to the <Link to="/" className="text-blue-500 underline">home page</Link>.
                    </p>
                </article>
            </div>
        </div>
    )
}

export default NotFound