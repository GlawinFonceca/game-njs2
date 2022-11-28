class room {
  async joinRoom(userId,userPoints) {
    try {
      let [userSqlLib,roomSqlLib] = AutoLoad.loadLibray("sqlLib", ["user","room"]);
      if (userPoints >= GLB.USER_GAME.MINIMUM_POINTS) {
        const updated = await userSqlLib.updateUsers({user_id: userId},
          {points :{$dec :GLB.USER_GAME.MINIMUM_POINTS}}
        );
        let roomData = {
          user_id: userId,
          status: GLB.ROOM_STATUS.ACTIVE_STATUS,
          strikes: GLB.DEFAULT_STRIKE,
          matrix: GLB.DEFAULT_MATRIX
        };
        if (updated) {
          return await roomSqlLib.createRoom(roomData);
        }
      } else {
        return false;
      }
    } catch (e) {
      console.log("Error joinRoom =>", e);
    }
  }
}

module.exports = room;
