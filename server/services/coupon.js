
export default class Auth {

    constructor () {
    }

    async use({serial}){

      try {
        let Coupon = await models.Coupon.find({where: {serial}})
        return Coupon;

      } catch (e) {
        throw e;
      }
    }

}
