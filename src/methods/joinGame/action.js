class JoinGameAction extends baseAction {
  async executeMethod() {
    try {
      let [roomHelperLib] = AutoLoad.loadLibray("helperLib", ["room"]);
      let [roomSqlLib] = AutoLoad.loadLibray("sqlLib", ["room"]);
      let { userObj, game_mode, roomId } = this;

      if (game_mode === GLB.GAME_MODE.NORMAL_CHECK) {
        let room = await roomSqlLib.findRoom({
          user_id: userObj.user_id,
          status: GLB.ROOM_STATUS.ACTIVE_STATUS,
        });
        if (!room) {
          this.setResponse("ROOM_NOT_FOUND");
          return {};
        }
        this.setResponse("SUCCESS");
        return { room_id: room.room_id };
      } else if (game_mode === GLB.GAME_MODE.RESUME_GAME) {
        if (!roomId) {
          this.setResponse("INVALID_ROOM_ID");
          return {};
        }
        const room = await roomSqlLib.findRoom({
          room_id: roomId,
          user_id: userObj.user_id,
        });
        if (!room) {
          this.setResponse("INVALID_ROOM_ID");
          return {};
        }
        const matrix = JSON.parse(room.matrix);
        this.setResponse("SUCCESS");
        return { room_id:room.room_id,matrix: matrix };
      } else if (game_mode === GLB.GAME_MODE.NEW_GAME) {
        await roomSqlLib.updateActiveRoomStatus(userObj.user_id);
        const roomId = await roomHelperLib.joinRoom(
          userObj.user_id,
          userObj.points
        );
        if (!roomId) {
          this.setResponse("INSUFFICIENT_POINTS");
          return {};
        }
        this.setResponse("SUCCESS");
        return { room_id: roomId };
      }
    } catch (e) {
      console.log("Error joinGame =>", e);
    }
  }
}

module.exports = JoinGameAction;
