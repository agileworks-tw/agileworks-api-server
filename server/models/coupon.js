module.exports = (sequelize, DataTypes) => {
  var Coupon = sequelize.define('Coupon', {
    serial: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    class: DataTypes.ENUM('jenkins', 'docker', 'TDD'),
    authorizeType: DataTypes.ENUM('trial', 'normal')
  }, {
    classMethods: {
      associate: (models) => {
        Coupon.belongsToMany(models.User, {through: 'UserCoupon'});
      }
    }
  });

  return Coupon;
};
