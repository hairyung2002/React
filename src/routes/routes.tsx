import React from 'react';

export const lazyRoutes = {
  MainPage: React.lazy(() => import('../pages/MainPage/MainPage')),
  MyInfoPage: React.lazy(() => import('../pages/MyPage/MyInfoPage')),
  NotFoundPage: React.lazy(() => import('../pages/NotFoundPage/NotFoundPage')),
  ProfilePage: React.lazy(() => import('../pages/ProfilePage/ProfilePage')),
};
