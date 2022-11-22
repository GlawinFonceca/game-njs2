let constant = [];

constant.USER_TYPE = {
  EMAIL: 1,
  FACEBOOK: 2,
  GUEST: 3,
  APPLE: 4,
  GOOGLE : 5,
  PHONE : 6
}

constant.ACTIVE = 1;
constant.INACTIVE = 2;
constant.BLOCKED = 3;
constant.DELETED = 4;
constant.IN_PROGRESS = 5;
constant.PENDING = 6;

constant.EMAIL_VERIFICATION_MAX_TIME_SECONDS = 10 * 60;

constant.CONNECTION_HANDLER_METHOD = null;
constant.DISCONNECTION_HANDLER_METHOD = null;

constant.SALTROUNDS=8;
constant.JWT_EXPIRE_TIME=3600000;
constant.WINNING_POINTS=50;
constant.DRAW_POINTS=-25;
constant.LOST_POINTS=-50;
constant.ENTRY_POINTS=500;
constant.ENTRY_DEDUCT_POINTS=50;
constant.POINTS =50;
constant.STATUS=1;


module.exports = constant;