export const authApi = {
    getUser: async (value) => {
        try {
            const response = await fetch(`http://localhost:3000/users?email=${encodeURIComponent(value)}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    },

    login: async (query) => {
        try {
            const response = await fetch(`http://localhost:3000/users?${query}`);
            if (!response.ok) {
                throw new Error('Failed to login');
            }
            return await response.json();
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    register: async (newUser) => {
        try {
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    },
};
