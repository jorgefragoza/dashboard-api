import {Router, Request, Response} from 'express';
import {ConfigRouter} from '../config.router';

const router: Router = Router();

const getRoutes = function() {
    let routes: any[] = [];

    ConfigRouter.map(route => {
        route.stack.map(r => {
            r.route.stack.map(m => {
                routes.push({
                    "method": m.method,
                    "path": r.route.path
                });
            });
        });
    });

    return routes;
};

router.get('/', async (req: Request, res: Response) => {
    res.json(getRoutes());
});

export const homeController: Router = router;