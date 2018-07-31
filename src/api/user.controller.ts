import {Router, Request, Response} from 'express';
import { UserBO } from '../bussinesobjects/core/user-bo';
//import { UserService } from '../dataservices/core/user-service'
//import bcrypt from 'bcrypt';
//import { Auth } from '../utils/auth';
import { _response } from '../utils/_response';

const router: Router = Router();
const userBO: UserBO = new UserBO();
//const userService: UserService = new UserService();
//const auth: Auth = new Auth();
//const SALT_WORK_FACTOR = 10;

router.get('/user/stepone/:username', async (req: Request, res: Response) => {
    const username = req.params.username;

    const response = await userBO.userByUsername(username);

    res.json(response);
});

router.post('/user/steptwo'), async (req: Request, res: Response) => {
    const password = req.body.password;
    const username = req.body.username;

    const response = await userBO.passwordValid(username, password);

    res.json(response);
}

// router.post('/user/steptwo', (req: Request, res: Response) => {
//     const password = req.body.password;
//     const username = req.body.username;

//     userService.findOne({'username': username})
//         .then(user => {
//             bcrypt.compare(password, user.password, (err, isValid) => {
//                 if(err) {
//                     res.json(
//                         _response(200, {'msg' : 'credenciales incorrectas.'})
//                     );
//                 } else {
//                     auth.createToken(user._id, username)
//                         .then(token => {
//                             res.json(
//                                 _response(200, {'token' : token} )
//                         )});
//                 }
//             });
//         })
//         .catch(err => {
//             res.json({'msg' : err});
//         })
// });

// router.post('/user/new/', (req: Request, res: Response) => {
//     const user = req.body;

//     bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
//         if(err) {
//             res.json(
//                 _response(500, null, err)
//             );
//         }
//         bcrypt.hash(user.password, salt, (err, hash) => {
//             if(err) {
//                 res.json(
//                     _response(500, null, err)
//                 );
//             }
//             user.password = hash;
//             userService.save(user)
//                 .then(result => {
//                     res.json(result);
//                 })
//                 .catch(err => {
//                     res.json({'msg' : err});
//                 });
//         });
//     });
// });

export const WelcomeController: Router = router;