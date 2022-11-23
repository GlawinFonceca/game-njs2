const RESPONSE = {
  INVALID_USER: {
    responseCode: 1001,
    responseMessage: {
      en: "message",
    },
  },
  INVALID_USER_CREDENTIALS: {
    responseCode: 1001,
    responseMessage: {
      en: "Invalid message",
    },
  },
  INSUFFICIENT_POINTS: {
    responseCode: 1001,
    responseMessage: {
      en: "message",
    },
  },
  ROOM_NOT_FOUND: {
    responseCode: 1001,
    responseMessage: {
      en: "room not found",
    }, 
  },
  ROOM_FOUND:{
    responseCode: 100001,
    responseMessage: {
      en: "room found",
    },
  },
  ROOM_ID_NOT_FOUND:{
    responseCode: 1001,
    responseMessage: {
      en: "roomId of id is not found",
    },
  },
  NO_PENDING_GAME: {
    responseCode: 10001,
    responseMessage: {
      en: "No pending games ",
    },
  },
  JOINED_ROOM:{
    responseCode: 100001,
    responseMessage: {
      en: "user joined the room",
    },
  },
  INVALID_ROOMID: {
    responseCode: 1001,
    responseMessage: {
      en: "Invalid room_id ",
    },
  },
  INSUFFICIENT_POPINTS: {
    responseCode: 1001,
    responseMessage: {
      en: "Insufficient points",
    },
  }
};

module.exports.RESPONSE = RESPONSE;
