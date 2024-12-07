import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import NoteForm from '../components/NoteForm'
import { noteApi } from '../api/noteApi'
import { setNotes } from '../redux/actions/noteActions' 

const EditNotePage = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [note, setNote] = useState(null)
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [errors, setErrors] = useState({})

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const data = await noteApi.findById(id)
                setNote(data)
                setTitle(data.title)
                setBody(data.body)
            } catch (error) {
                console.error('Error fetching note:', error)
            }
        }

        fetchNote()
    }, [id])

    const validateForm = () => {
        const validationErrors = {}

        if (!title.trim()) {
            validationErrors.title = 'The note title cannot be empty'
        }

        return validationErrors
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const validationErrors = validateForm()

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        try {
            const data = await noteApi.update(id, title, body)
            dispatch(setNotes((prevNotes) => prevNotes.map(note => note.id === data.id ? data : note)))
            navigate(`/note/${data.id}`)
        } catch (error) {
            console.error('Error updating note:', error)
            setErrors({ submit: 'Failed to update note. Please try again later.' })
        }
    }

    if (!note) {
        return <div className="text-center">Loading...</div>
    }

    return (
        <div className="flex items-center justify-center bg-white w-3/5">
            <div className="bg-white shadow-md rounded-lg p-8 w-full">
                <article className="prose lg:prose-xl">
                    <h1 className="prose-2xl font-bold">Edit</h1>
                    <NoteForm
                        title={title}
                        setTitle={setTitle}
                        body={body}
                        setBody={setBody}
                        errors={errors}
                        onSubmit={handleSubmit}
                        isEditing={true}
                    />
                </article>
            </div>
        </div>
    )
}

export default EditNotePage