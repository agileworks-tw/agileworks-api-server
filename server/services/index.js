import MainService from './main';
import AuthService from './auth';
import CouponService from './coupon';


export default class Services {

    constructor () {
      this.main = new MainService();
      this.auth = new AuthService();
      this.coupon = new CouponService();

    }

}
