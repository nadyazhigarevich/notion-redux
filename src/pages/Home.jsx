import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { formatDate } from '../utils/formatDate'

const Home = () => {
    const user = useSelector((state) => state.auth.user)
    const signUpDate = formatDate(user.createdAt)
    

    return (
        <div className="flex items-center justify-center bg-white w-2/5">
            <div className="bg-white shadow-md rounded-lg p-8 w-full">
                <article className="prose lg:prose-xl">
                    <h1 className="mb-6">About me</h1>
                    <div className="mb-8">
                        <p>Email: {user.email}</p>
                        <p>Date sign up: {signUpDate}</p>
                    </div>
                    <Link
                        to="/notes"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full inline-block text-center"
                    >
                        Go to Notes
                    </Link>
                </article>
            </div>
        </div>
    )
}

export default Home