import MainService from './main';
import AuthService from './auth';


export default class Services {

    constructor () {
      this.main = new MainService();
      this.auth = new AuthService();

    }

}
