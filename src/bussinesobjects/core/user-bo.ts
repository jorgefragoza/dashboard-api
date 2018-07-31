import { UserService } from '../../dataservices/core/user-service'
import { _response } from '../../utils/_response';
import { Auth } from '../../utils/auth';
import bcrypt from 'bcrypt';

export class UserBO {
    private userService: UserService;
    private auth: Auth;

    constructor() {
        this.userService = new UserService();
        this.auth = new Auth();
    }

    public async userByUsername(username: string): Promise<any> {
        try {
            const filter = {
                'username': username
            };
    
            let user = await this.userService.find(filter);

            // reglas de negocio con la variable user
            
            return _response(200, user);
        } catch(ex) {
            return _response(500, null, ex.message);
        }
    }

    public async passwordValid(username: string, password: string): Promise<any> {
        try {
            let user = await this.userByUsername(username);
            bcrypt.compare(password, user.password, (err, isValid) => {
                if(err) {
                    return _response(200, {'messages':['Credenciales incorrectas.']});
                } else {
                    this.auth.createToken(user._id, username)
                        .then(token => {
                            return _response(200, {token: token});
                        })
                        .catch(err => {
                            return _response(500, null, err);
                        });
                }
            });
        } catch(ex) {
            return _response(500, null, ex.message);
        }
    }
}