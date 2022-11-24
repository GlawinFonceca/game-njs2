const RESPONSE = {
  INVALID_USER: {
    responseCode: 1001,
    responseMessage: {
      en: "message",
    },
  },
  INVALID_USER_CREDENTIALS: {
    responseCode: 1002,
    responseMessage: {
      en: "Invalid message",
    },
  },
  ROOM_NOT_FOUND: {
    responseCode: 1003,
    responseMessage: {
      en: "room not found",
    },
  },
  INVALID_ROOM_ID: {
    responseCode: 1004,
    responseMessage: {
      en: "invalid room id",
    },
  },
  NO_PENDING_GAME: {
    responseCode: 1005,
    responseMessage: {
      en: "No pending games ",
    },
  },
  INSUFFICIENT_POINTS: {
    responseCode: 1006,
    responseMessage: {
      en: "Insufficient points",
    },
  },
  INVALID_INDEX: {
    responseCode: 1007,
    responseMessage: {
      en: "inavalid index ",
    },
  },
  INVALID_VALUE:{
    responseCode: 1007,
    responseMessage: {
      en: "inavalid value.Please enter 'x' or 'o' ",
    },

  }
  
};

module.exports.RESPONSE = RESPONSE;
