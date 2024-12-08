import React, { Suspense } from 'react';
import PrivateLayout from '../layout/PrivateLayout';

const UserProfile = React.lazy(() => import('../components/UserProfile'));

const User = () => {
  return (
    <PrivateLayout>
      <Suspense fallback={<div>Loading user profile...</div>}>
        <UserProfile />
      </Suspense>
    </PrivateLayout>
  );
};

export default User;
