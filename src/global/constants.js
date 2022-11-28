let constant = [];

constant.USER_TYPE = {
  EMAIL: 1,
  FACEBOOK: 2,
  GUEST: 3,
  APPLE: 4,
  GOOGLE: 5,
  PHONE: 6,
};

constant.ACTIVE = 1;
constant.INACTIVE = 2;
constant.BLOCKED = 3;
constant.DELETED = 4;
constant.IN_PROGRESS = 5;
constant.PENDING = 6;

constant.EMAIL_VERIFICATION_MAX_TIME_SECONDS = 10 * 60;

constant.CONNECTION_HANDLER_METHOD = null;
constant.DISCONNECTION_HANDLER_METHOD = null;

constant.SALTROUNDS = 8;
constant.JWT_EXPIRE_TIME = 3600000;
constant.USER_STATUS=1;

constant.USER_GAME = {
  WINNING_POINTS: 100,
  DRAW_POINTS: 25,
  ENTRY_POINTS: 500,
  MINIMUM_POINTS: 50,
};

constant.ROOM_STATUS = {
  CLOSE_STATUS: 0,
  ACTIVE_STATUS: 1,
  COMPLETED_STATUS: 2,
};

constant.GAME_MODE = {
  NORMAL_CHECK: 0,
  RESUME_GAME: 1,
  NEW_GAME: 2,
};

constant.DEFAULT_STRIKE = {
  strike1: 0,
  strike2: 0,
  strike3: 0,
  strike4: 0,
  strike5: 0,
  strike6: 0,
  strike7: 0,
  strike8: 0,
};

constant.DEFAULT_MATRIX = ["", "", "", "", "", "", "", "", ""];
constant.CONNECTION_HANDLER_METHOD ="socketConnect";
constant.DISCONNECTION_HANDLER_METHOD = "socketDisconnect"

module.exports = constant;
