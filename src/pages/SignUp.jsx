import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { validateForm } from '../utils/validation'
import Form from '../components/Form'
import { setUser } from '../redux/actions/authActions'
import { authApi } from '../api/authApi'

const SignUp = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [errors, setErrors] = useState({})

    const handleEmailChange = async (e) => {
        const value = e.target.value
        setEmail(value)

        if (value) {
            try {
                const users = await authApi.getUser(value)
                if (users.length > 0) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        email: 'This email is already in use.',
                    }))
                } else {
                    setErrors((prevErrors) => {
                        const { email, ...rest } = prevErrors
                        return rest
                    })
                }
            } catch (error) {
                console.error('Error checking email:', error)
                setErrors({ server: 'Error checking email' })
            }
        } else {
            setErrors((prevErrors) => {
                const { email, ...rest } = prevErrors
                return rest
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const validationErrors = validateForm(email, password, repeatPassword)

        if (Object.keys(validationErrors).length > 0 || errors.email) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                ...validationErrors,
            }))
            return
        }

        const newUser = {
            email,
            password,
            createdAt: Date.now(),
        }

        try {
            const user = await authApi.register(newUser)
            dispatch(setUser(user))
            setEmail('')
            setPassword('')
            setRepeatPassword('')
            setErrors({})
            navigate('/')
        } catch (error) {
            setErrors({ server: 'Server error. Please try again later.' })
        }
    }

    const fields = [
        {
            id: 'email',
            label: 'Email',
            type: 'email',
            value: email,
            onChange: handleEmailChange,
            placeholder: 'Enter your email'
        },
        {
            id: 'password',
            label: 'Password',
            type: 'password',
            value: password,
            onChange: (e) => setPassword(e.target.value),
            placeholder: 'Enter your password'
        },
        {
            id: 'repeat-password',
            label: 'Repeat Password',
            type: 'password',
            value: repeatPassword,
            onChange: (e) => setRepeatPassword(e.target.value),
            placeholder: 'Repeat your password'
        }
    ]

    return (
        <div className="bg-gray-100 w-1/3 flex justify-center items-center">
            <Form title="Sign Up" fields={fields} onSubmit={handleSubmit} errors={errors} />
        </div>
    )
}

export default SignUp