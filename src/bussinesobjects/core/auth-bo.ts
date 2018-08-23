import { UserService } from '../../dataservices/core/user-service'
import { _response } from '../../utils/_response';
import { Auth } from '../../utils/auth';
import bcrypt from 'bcrypt';

export class AuthBO {
    private userService: UserService;
    private auth: Auth;
    private SALT_WORK_FACTOR: number = 10;

    constructor() {
        this.userService = new UserService();
        this.auth = new Auth();
    }

    public async userByUsername(username: string): Promise<any> {
        try {
            let filter = {'username': username};
            let user = await this.userService.findOne(filter);
            // reglas de negocio con la variable user
            
            return _response(200, user);
        } catch(ex) {
            return _response(500, null, ex.message);
        }
    }

    public async generateToken(username: string, password: string, dataRequest?:any): Promise<any> {
        try {
            let filter = {'username': username};
            let user = await this.userService.findOne(filter);
            let isValid = await bcrypt.compare(password, user.password);
            if(isValid) {
                let token = await this.auth.createToken(user._id, username);
                // TODO:: reglas para persistir estadisticas y control de inicio de sesión
                // ej: sesiones correctas, registrar ip sesion, motor
                return _response(200, {'token': token});
            } else {
                // TODO:: registro intentos de sesion incorrectos
                // ej: bloquear request de ips atacantes
                return _response(200, {'messages': ['Credenciales incorrectas.']});
            }
        } catch(ex) {
            return _response(500, null, ex.message);
        }
    }

    public async verifyToken(hash: string): Promise<any> {
        return _response(200, {});
    }

    public async newUser(user: any): Promise<any> {
        try {
            let filter = {
                'username': user.username
            };
            let exists = await this.userService.findOne(filter);
            if(exists) {
                return _response(200, {'messages': ['No se registró, usuario existente.']})
            }
            let salt = await bcrypt.genSalt(this.SALT_WORK_FACTOR);
            let hash = await bcrypt.hash(user.password, salt);
            user.password = hash;
            let saved = await this.userService.save(user);

            return _response(200, saved);
        } catch(ex) {
            return _response(500, null, ex.message);
        }
    }
}