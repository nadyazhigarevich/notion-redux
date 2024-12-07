import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { noteApi } from '../api/noteApi'
import { deleteNote } from '../redux/actions/noteActions'

const NotePage = () => {
    const { id } = useParams()
    const [note, setNote] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const data = await noteApi.findById(id)
                setNote(data)
            } catch (error) {
                console.error('Error fetching note:', error)
                navigate('/notes')
            } finally {
                setLoading(false)
            }
        }

        fetchNote()
    }, [id, navigate])

    const handleDelete = async () => {
        if (!user) {
            alert('You must be logged in to delete a note.')
            return
        }

        try {
            await noteApi.delete(id)
            dispatch(deleteNote(id)) 
            navigate('/notes')
        } catch (error) {
            console.error('Error deleting note:', error)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="bg-white shadow-md rounded-lg p-8 w-3/5 max-w-md">
                    <article className="prose lg:prose-xl">
                        <h1 className="mb-6">Loading...</h1>
                    </article>
                </div>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center bg-white w-3/5">
            <div className="bg-white shadow-md rounded-lg p-8 w-full">
                <article className="prose lg:prose-xl">
                    <h1 className="mb-6">{note.title}</h1>
                    <div className="flex justify-between items-center mb-6">
                        <Link to={`/edit-note/${note.id}`} className="text-blue-500 hover:text-blue-700 flex items-center">
                            ✍️ Edit
                        </Link>
                        <button onClick={handleDelete} className="text-red-500 hover:text-red-700 flex items-center">
                            🗑 Delete
                        </button>
                    </div>
                    <pre className="whitespace-pre-wrap mb-6 bg-gray-100 p-4 rounded-md text-black">{note.body}</pre>
                    <Link to="/notes" className="text-blue-500 hover:text-blue-700">
                        Back
                    </Link>
                </article>
            </div>
        </div>
    )
}

export default NotePage