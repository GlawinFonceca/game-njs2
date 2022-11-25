class GameAction extends baseAction {
  async executeMethod() {
    try {
      let [roomSqlLib, userSqlLib] = AutoLoad.loadLibray("sqlLib", [
        "room",
        "user",
      ]);
      let [gameHelperLib] = AutoLoad.loadLibray("helperLib", ["game"]);

      let { userObj, index, value, roomId } = this;
      value = value.toLowerCase();
      if (!roomId) {
        this.setResponse("INVALID_ROOM_ID");
        return {};
      }
      const validIndex = await gameHelperLib.indexValidation(index);
      if (!validIndex) {
        this.setResponse("INVALID_INDEX");
        return {};
      }
      const validValue = await gameHelperLib.valueValidation(value);
      if (!validValue) {
        this.setResponse("INVALID_VALUE");
        return {};
      }

      let room = await roomSqlLib.findRoom({
        user_id: userObj.user_id,
        room_id: roomId,
      });
      let matrix = room.matrix;
      if (typeof matrix == "string") {
        matrix = JSON.parse(matrix);
      }

      if (matrix[index] !== "") {
        this.setResponse("INVALID_INDEX");
        return { };
      }
      matrix.splice(index, 1, value);
      await roomSqlLib.updateMatrix(userObj.user_id, roomId, matrix);
      const userTurn = await gameHelperLib.chooseTurn(matrix);
      await gameHelperLib.winnerSelection(
        matrix,
        room.strikes,
        userTurn,
        userObj.user_id,
        roomId
      );

      let completeMatrix = matrix.every((e) => e !== "");
      if (completeMatrix) {
        room = await roomSqlLib.findRoom({
          user_id: userObj.user_id,
          room_id: roomId,
        });
        if (room.user_strike > room.bot_strike) {
          await userSqlLib.updateUsers(
            { user_id: userObj.user_id },
            {
              points: { $inc: GLB.USER_GAME.WINNING_POINTS },
              win_games: { $inc: 1 },
              total_played_games: { $inc: 1 },
            }
          );
          await roomSqlLib.updateRoom(
            { user_id: userObj.user_id, room_id: roomId },
            { status: GLB.ROOM_STATUS.COMPLETED_STATUS }
          );
          this.setResponse("SUCCESS");
          return { message: "win" };
        } else if (room.bot_strike > room.user_strike) {
          await userSqlLib.updateUsers(
            { user_id: userObj.user_id },
            {
              total_played_games: { $inc: 1 },
            }
          );
          await roomSqlLib.updateRoom(
            { user_id: userObj.user_id, room_id: roomId },
            { status: GLB.ROOM_STATUS.COMPLETED_STATUS }
          );
          this.setResponse("SUCCESS");
          return { message: "you lost" };
        } else {
          await userSqlLib.updateUsers(
            { user_id: userObj.user_id },
            {
              points: { $inc: GLB.USER_GAME.DRAW_POINTS },
              total_played_games: { $inc: 1 },
            }
          );
          await roomSqlLib.updateRoom(
            { user_id: userObj.user_id, room_id: roomId },
            { status: GLB.ROOM_STATUS.COMPLETED_STATUS }
          );
          this.setResponse("SUCCESS");
          return { message: "match draw" };
        }
      }

      let botTurn = await gameHelperLib.chooseTurn(matrix);
      if (botTurn % 2 == 0) {
        //taking index of empty elements in matrix array
        const indexOfMatrixElements = matrix
          .map((item, i) => (item == "" ? i : 9))
          .filter((x) => x != 9);
        //return index indexOf Matrix's EmptyElements
        const indexForBotSelection = await gameHelperLib.generateRandomIndex(
          indexOfMatrixElements.length
        );
        const botSelectedData = await gameHelperLib.getRandomBotDecision();
        const botSelectedIndex = indexOfMatrixElements[indexForBotSelection];
        matrix.splice(botSelectedIndex, 1, botSelectedData);
        await roomSqlLib.updateMatrix(userObj.user_id, roomId, matrix);
        room = await roomSqlLib.findRoom({
          user_id: userObj.user_id,
          room_id: roomId,
        });
        botTurn = await gameHelperLib.chooseTurn(matrix);
        await gameHelperLib.winnerSelection(
          matrix,
          room.strikes,
          botTurn,
          userObj.user_id,
          roomId
        );
      } else {
        return { matrix };
      }
      this.setResponse("SUCCESS");
      return { matrix, message: "User's Turn" };
    } catch (e) {
      console.log("Error game =>", e);
    }
  }
}
module.exports = GameAction;
