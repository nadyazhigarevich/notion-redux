import React from 'react'
import { Outlet, useLocation, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearUser } from '../redux/actions/authActions'

const Layout = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user) 

    const hideHeader = ['/signup', '/login', '*'].includes(location.pathname)

    const handleLogout = () => {
        dispatch(clearUser()) 
        localStorage.removeItem('userId')
        navigate('/login') 
    }

    return (
        <div className="flex flex-col min-h-screen">
            {!hideHeader && (
                <header className="p-4 bg-white shadow-md">
                    <nav className="flex justify-between items-center">
                        <div className="flex items-center">
                            {user ? `Hello, ${user.email}` : 'Welcome!'}
                        </div>
                        <div className="flex items-center space-x-4">
                            <NavLink 
                                to="/" 
                                className={({ isActive }) => `${isActive ? 'text-blue-500 font-bold' : 'text-gray-500'}`}>
                                Home
                            </NavLink>
                            <NavLink 
                                to="/notes" 
                                className={({ isActive }) => `${isActive ? 'text-blue-500 font-bold' : 'text-gray-500'}`}>
                                Notes
                            </NavLink>
                            {user && (
                                <button 
                                    onClick={handleLogout} 
                                    className="text-gray-500 hover:text-blue-500">
                                    Logout
                                </button>
                            )}
                        </div>
                    </nav>
                </header>
            )}
            <main className="flex-grow p-10 bg-gray-100 flex justify-center items-center">
                <Outlet />
            </main>
            <footer className="h-10 flex justify-between items-center text-gray-500 px-10">
                <p>Created by: Zhigarevich Nadezhda</p>
                <p>BSU: 2024</p>
            </footer>
        </div>
    )
}

export default Layout