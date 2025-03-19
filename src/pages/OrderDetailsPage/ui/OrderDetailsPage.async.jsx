import { lazy } from 'react';

export const OrderDetailsPageAsync = lazy(
    () => import('./OrderDetailsPage.jsx'),
);
