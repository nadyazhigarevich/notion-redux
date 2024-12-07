import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { validateForm } from '../utils/validation'
import Form from '../components/Form'
import { setUser, clearUser } from '../redux/actions/authActions'
import { authApi } from '../api/authApi'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({})

    const handleLogin = async (e) => {
        e.preventDefault()
        const validationErrors = validateForm(email, password)

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        try {
            const query = new URLSearchParams({ email, password }).toString()
            const users = await authApi.login(query)
            const user = users[0]

            if (user && user.password === password) {
                dispatch(setUser(user))
                localStorage.setItem('user', JSON.stringify(user)) 
                localStorage.setItem('userId', user.id) 
                navigate('/')
                setEmail('')
                setPassword('')
                setErrors({})
            } else {
                setErrors({ invalid: 'Invalid email or password' })
            }
        } catch (error) {
            console.error('Error during request:', error)
            setErrors({ server: 'Server error. Please try again later.' })
        }
    }

    const fields = [
        {
            id: 'email',
            label: 'Email',
            type: 'email',
            value: email,
            onChange: (e) => setEmail(e.target.value),
            placeholder: 'Enter your email'
        },
        {
            id: 'password',
            label: 'Password',
            type: 'password',
            value: password,
            onChange: (e) => setPassword(e.target.value),
            placeholder: 'Enter your password'
        }
    ]

    return (
        <div className="bg-gray-100 w-1/3 py-10 flex justify-center items-center">
            <Form title="Log In" fields={fields} onSubmit={handleLogin} errors={errors} />
        </div>
    )
}

export default Login