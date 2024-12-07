import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { formatDate } from '../utils/formatDate'
import { noteApi } from '../api/noteApi'
import { setNotes, deleteNote } from '../redux/actions/noteActions'

export default function NotesPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const user = useSelector(state => state.auth.user)
    const notes = useSelector(state => state.notes.notes)
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (user?.id) {
            noteApi.findByAuthor(user.id)
                .then(data => {
                    const sortedNotes = data.sort((a, b) => b.createdAt - a.createdAt)
                    dispatch(setNotes(sortedNotes))
                })
                .catch(error => {
                    console.error('Fetch error:', error)
                    setErrors({ server: 'Server error. Please try again later.' })
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [user, dispatch])

    const handleDelete = (noteId) => {
        noteApi.delete(noteId)
            .then(() => {
                dispatch(deleteNote(noteId)) 
            })
            .catch(error => {
                console.error('Delete error:', error)
                setErrors({ server: 'Server error. Please try again later.' })
            })
    }

    const handleCreateNote = () => {
        navigate('/create-note')
    }
    const handleNoteClick = (noteId) => {
        navigate(`/note/${noteId}`)
    }

    if (loading) {
        return <div className="text-center">Loading...</div>
    }

    return (
        <div className="flex items-center justify-center bg-white w-3/5">
            <div className="bg-white shadow-md rounded-lg p-8 w-full">
                <article className="prose prose-slate prose-sm lg:prose-base">
                    <h1 className="font-bold">My Notes</h1>
                    {errors.server && <p className="text-red-500 text-xs italic">{errors.server}</p>}
                    <button
                        onClick={handleCreateNote}
                        className="bg-blue-500 hover:bg-blue-700 text-center mt-4 text-white w-2/5 font-bold py-2 px-4 rounded inline-block"
                    >
                        Create New Note
                    </button>
                    <ul className="divide-gray-300">
                        {notes.map(note => (
                            <li
                                key={note.id}
                                className="flex pb-4 justify-between items-center h-28 w-full hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                                onClick={() => handleNoteClick(note.id)}
                            >
                                <div>
                                    <h2 className="text-lg font-semibold">{note.title}</h2>
                                    <p className="text-gray-600">{formatDate(note.createdAt)}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <Link to={`/edit-note/${note.id}`} className="text-blue-500 hover:text-blue-700">
                                        ✍️
                                    </Link>
                                    <button onClick={(e) => { e.stopPropagation(); handleDelete(note.id); }} className="text-red-500 hover:text-red-700">
                                        🗑
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </article>
            </div>
        </div>
    );
}