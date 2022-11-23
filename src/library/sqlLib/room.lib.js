
class room {
  async findRoom(userId) {
    try {
      console.log(userId);
      return await SQLManager.findOne("room", {
        user_id: userId,
        status: GLB.ACTIVE_STATUS,
      });
    } catch (e) {
      console.log("Error findRooms =>", e);
    }
  }

  async findRoomId(roomId, userId) {
    try {
      return await SQLManager.findOne("room", {
        room_id: roomId,
        user_id: userId,
      });
    } catch (e) {
      console.log("Error resumeGame =>", e);
    }
  }

  async roomUpdate(userId) {
    try {
      return await SQLManager.update(
        "room",
        { user_id: userId, status: GLB.ACTIVE_STATUS },
        { status: GLB.STATUS }
      );
    } catch (e) {
      console.log("Error roomStatusUpdate =>", e);
    }
  }

  async findActiveUser(roomId, userId) {
    try {
      return await SQLManager.findOne("room", {
        room_id: roomId,
        user_id: userId,
        status: GLB.ACTIVE_STATUS,
      });
    } catch (e) {
      console.log("Error resumeGame =>", e);
    }
  }

  async create(user) {
    try {
      return await SQLManager.insert("room", user);
    } catch (e) {
      console.log("Error resumeGame =>", e);
    }
  }

  async updateStrike(user, updates) {
    try {
      return await SQLManager.update("room", user, updates);
    } catch (e) {
      console.log("Error strikeUpdate =>", e);
    }
  }

  async findRooms(userId,roomId) {
    try {
    ;
      return await SQLManager.findOne("room", {
        user_id: userId,
        room_id :roomId,
      });
    } catch (e) {
      console.log("Error findRooms =>", e);
    }
  }

  async updateMatrix(userId,roomId,matrix) {
    try {
      return    await SQLManager.update("room",{user_id:userId,room_id:roomId},{matrix : matrix})
    } catch (e) {
      console.log("Error strikeUpdate =>", e);
    }
  }

}

module.exports = room;
