import { Router } from 'express';
import amazonData from './amazonData';

const router = Router();

const defaultRoutes = [
    {
        path: '/amazon',
        route: amazonData,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;