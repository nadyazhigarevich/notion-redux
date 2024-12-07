import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import NoteForm from '../components/NoteForm'
import { addNote } from '../redux/actions/noteActions'
import { noteApi } from '../api/noteApi'

const CreateNotePage = () => {
    const { user } = useSelector(state => state.auth)
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const validationErrors = validateForm(title)
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        try {
            const data = await noteApi.create(user.id, title, body)
            dispatch(addNote(data)) 
            navigate(`/note/${data.id}`)
        } catch (error) {
            console.error('Error creating note:', error)
            setErrors({ submit: 'Failed to create note. Please try again later.' })
        }
    }

    const validateForm = (title) => {
        const errors = {}
        if (!title.trim()) {
            errors.title = 'The note title cannot be empty'
        }
        return errors
    }

    return (
        <div className="flex items-center justify-center bg-white w-3/5">
            <div className="bg-white shadow-md rounded-lg p-8 w-full">
                <article className="prose lg:prose-xl">
                    <h1 className="prose-2xl font-bold mb-4">Create a new note</h1>
                    <NoteForm
                        title={title}
                        setTitle={setTitle}
                        body={body}
                        setBody={setBody}
                        errors={errors}
                        onSubmit={handleSubmit}
                        isEditing={false}
                    />
                </article>
            </div>
        </div>
    )
}

export default CreateNotePage