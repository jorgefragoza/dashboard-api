import {Router, Request, Response} from 'express';
import { AuthBO } from '../bussinesobjects/core/auth-bo';


const router: Router = Router();
const authBO: AuthBO = new AuthBO();
const prefix: string = '/api/auth';


router.get(`${prefix}/stepone/:username`, async (req: Request, res: Response) => {
    let username = req.params.username;
    let response = await authBO.userByUsername(username);

    res.json(response);
});

router.post(`${prefix}/steptwo/`, async (req: Request, res: Response) => {
    let password = req.body.password;
    let username = req.body.username;
    let response = await authBO.generateToken(username, password);

    res.json(response);
});

router.post(`${prefix}/new/`, async (req: Request, res: Response) => {
    let user = req.body;
    let response = await authBO.newUser(user);

    res.json(response);
});

export const userController: Router = router;