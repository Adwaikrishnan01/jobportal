import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCurrentUser, logoutUser } from '../redux/slices/authSlice';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, status } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && status === 'idle') {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, isAuthenticated, status]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  if (status === 'loading') {
    return <div>Loading user data...</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      {user && (
        <>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
};

export default UserProfile;