import { createContext, useEffect, useState } from 'react'

export const UserContext = createContext(null)

export default function UserContextProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        const id = localStorage.getItem('userId')
        if (id) {
            fetch(`http://localhost:3000/users?id=${id}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok')
                    }
                    return response.json()
                })
                .then((users) => {
                    if (users.length > 0) {
                        setUser(users[0])
                    } else {
                        console.error('No user found')
                    }
                })
                .catch((error) => {
                    console.error('Fetch error:', error)
                })
                .finally(() => {
                    setLoading(false)
                })
        } else {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if (user?.id) {
            localStorage.setItem('userId', user.id)
        }
    }, [user?.id])

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    )
}