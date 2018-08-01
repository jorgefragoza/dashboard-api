import {Router, Request, Response} from 'express';
import { UserBO } from '../bussinesobjects/core/user-bo';

const router: Router = Router();
const userBO: UserBO = new UserBO();


router.get('/user/stepone/:username', async (req: Request, res: Response) => {
    let username = req.params.username;
    let response = await userBO.userByUsername(username);

    res.json(response);
});

router.post('/user/steptwo/', async (req: Request, res: Response) => {
    let password = req.body.password;
    let username = req.body.username;
    let response = await userBO.generateToken(username, password);

    res.json(response);
});

router.post('/user/new/', async (req: Request, res: Response) => {
    let user = req.body;
    let response = await userBO.newUser(user);

    res.json(response);
});

export const WelcomeController: Router = router;