

export default async (cb) => {


  try {
    let couponData = {
      serial: '11111111',
      class: 'jenkins',
      authorizeType: 'normal'
    }
    await models.Coupon.findOrCreate({
      where: {serial: couponData.serial},
      defaults: couponData
    });

  } catch (e) {

    console.log("error", e);

  }
}
