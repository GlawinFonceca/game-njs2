const SQLManager = require("@njs2/sql");

class JoinGameAction extends baseAction {
  async executeMethod() {
    try {
      let [roomHelperLib] = AutoLoad.loadLibray("helperLib", ["room"]);
      let [roomSqlLib] = AutoLoad.loadLibray("sqlLib", ["room"]);
      let { userObj } = this;
      let { game_mode } = this;

      if (game_mode == GLB.NORMAL_CHECK) {
        let room = await roomSqlLib.findRoom(userObj.user_id);
        if (!room) {
          this.setResponse("ROOM_NOT_FOUND");
          return {};
        }
        this.setResponse("ROOM_FOUND");
        return {
          room_id: room.room_id,
        };
      } else if (game_mode == GLB.RESUME_GAME) {
        let { roomId } = this;
        const validRoomId = await roomSqlLib.findRoomId(
          roomId,
          userObj.user_id
        );
        if (!validRoomId) {
          this.setResponse("INVALID_ROOMID");
          return {};
        }
        const room = await roomSqlLib.findActiveUser(
          roomId,
          userObj.user_id
        );
        if (!room) {
          this.setResponse("NO_PENDING_GAME", { id: roomId });
          return {};
        }
        const matrix = JSON.parse(room.matrix);
        this.setResponse("SUCCESS");
        return { matrix: matrix };
      } else if (game_mode === GLB.NEW_GAME) {
        await roomSqlLib.roomUpdate(userObj.user_id);
        const roomId = await roomHelperLib.joinRoom(userObj);
        if (!roomId) {
          this.setResponse("INSUFFICIENT_POPINTS");
          return {};
        }
        this.setResponse("JOINED_ROOM");
        return { room_id: roomId };
      }
    } catch (e) {
      console.log("Error joinGame =>", e);
    }
  }
}

module.exports = JoinGameAction;
