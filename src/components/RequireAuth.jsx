import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function RequireAuth({ children }) {
    const { user, loading } = useSelector(state => ({
        user: state.auth.user,
        loading: state.auth.loading, 
    }));

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user?.id) {
        return <Navigate to="/login" replace />;
    }

    return children;
}