export const noteApi = {
    
    findAll: async () => {
        try {
            const response = await fetch('http://localhost:3000/notes');
            if (!response.ok) {
                throw new Error('Failed to fetch notes');
            }
            return await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    },

    findById: async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/notes/${id}`);
            if (!response.ok) {
                throw new Error('Note not found');
            }
            return await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    },

    findByAuthor: async (authorId) => {
        try {
            const response = await fetch(`http://localhost:3000/notes?authorId=${authorId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    },

    create: async (authorId, title, body) => {
        try {
            const response = await fetch('http://localhost:3000/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    authorId,
                    title,
                    body,
                    createdAt: Date.now(),
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to create note');
            }
            return await response.json();
        } catch (error) {
            console.error('Create error:', error);
            throw error;
        }
    },

    update: async (id, title, body) => {
        try {
            const response = await fetch(`http://localhost:3000/notes/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    body,
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to update note');
            }
            return await response.json();
        } catch (error) {
            console.error('Update error:', error);
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/notes/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete note');
            }
        } catch (error) {
            console.error('Delete error:', error);
            throw error;
        }
    },
}