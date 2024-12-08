import React, { Suspense } from 'react';
import PrivateLayout from '../layout/PrivateLayout';

const UserProfile = React.lazy(() => import('../components/UserProfile'));

const User = () => {
  return (
    <PrivateLayout>
        <UserProfile></UserProfile>
    </PrivateLayout>
  );
};

export default User;
