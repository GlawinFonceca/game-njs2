const SQLManager = require("@njs2/sql");

class room {
  async findRoom(query) {
    try {
      return await SQLManager.findOne("room", query);
    } catch (e) {
      console.log("Error findRoom =>", e);
    }
  }

  async updateActiveRoomStatus(userId) {
    try {
      return await SQLManager.update(
        "room",
        { user_id: userId, status: GLB.ROOM_STATUS.ACTIVE_STATUS },
        { status: GLB.ROOM_STATUS.CLOSE_STATUS }
      );
    } catch (e) {
      console.log("Error updateActiveRoomStatus =>", e);
    }
  }

  async createRoom(room) {
    try {
      return await SQLManager.insert("room", room);
    } catch (e) {
      console.log("Error createRoom =>", e);
    }
  }

  async updateStrikes(userId, roomId, strikes, strike) {
    try {
      return await SQLManager.doExecuteRawQuery(
        `UPDATE room SET strikes=JSON_SET('${strikes}','${strike}',1) WHERE user_id=${userId} AND room_id=${roomId}`
      );
    } catch (e) {
      console.log("Error updateStrike =>", e);
    }
  }

  async updateMatrix(userId, roomId, matrix) {
    try {
      return await SQLManager.update(
        "room",
        { user_id: userId, room_id: roomId },
        { matrix: matrix }
      );
    } catch (e) {
      console.log("Error strikeUpdate =>", e);
    }
  }

  async updateRoom(query, updates) {
    try {
      return await SQLManager.update("room", query, updates);
    } catch (e) {
      console.log("Error strikeUpdate =>", e);
    }
  }

  async updateStrike(query, updates) {
    //update user or bot's strike
    try {
      await SQLManager.update("room", query, updates);
    } catch (e) {
      console.log("Error updateStrike =>", e);
    }
  }
}

module.exports = room;
