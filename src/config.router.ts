import {Router} from 'express';
import * as configRoutes from './api/.index';

let routes: Router[] = [];
let route: Router;

Object.keys(configRoutes).map(function(key, index) {
    route = configRoutes[key];
    routes.push(route);
});

export const ConfigRouter: Router[] = routes;