const { AutoLoad } = require("@njs2/base");
const SQLManager = require("@njs2/sql");

let userCount = 0;
let botCount = 0;

class GameAction extends baseAction {
  generateRandomIndex(num) {
    let item = Math.floor(Math.random() * (num - 1));
    return item;
  }

  getRandomBotDecision() {
    let item = Math.floor(Math.random() * 2);
    if (item === 0) {
      return "x";
    } else {
      return "o";
    }
  }

  userStrike() {
    userCount = userCount + 1;
    console.log({ userCount });
  }

  botStrike() {
    botCount = botCount + 1;
    console.log({ botCount });
  }

  async winnerSelection(matrix, turn, userId, roomId) {
    let [roomSqlLib] = AutoLoad.loadLibray("sqlLib", ["room"]);
    let strike = await SQLManager.findOne("room", {
      user_id: userId,
      room_id: roomId,
    });
    let strikes = strike.strikes;

    if (strikes.strike1 !== 1) {
      if (matrix[0] === "x" && matrix[1] === "o" && matrix[2] === "x") {
        await roomSqlLib.updateStrike(
          { user_id: userId, room_id: roomId },
          { strikes: { strike1: { $inc: 1 } } }
        );
        if (turn % 2 == 0) {
          this.userStrike();
        } else {
          this.botStrike();
        }
      }
    }
    if (strikes.strike2 !== 1) {
      if (matrix[3] === "x" && matrix[4] === "o" && matrix[5] === "x") {
        await roomSqlLib.updateStrike(
          { user_id: userId, room_id: roomId },
          { strikes: { strike2: { $inc: 1 } } }
        );
        if (turn % 2 == 0) {
          this.userStrike();
        } else {
          this.botStrike();
        }
      }
    }
    if (strikes.strike3 !== 1) {
      if (matrix[6] === "x" && matrix[7] === "o" && matrix[8] === "x") {
        await roomSqlLib.updateStrike(
          { user_id: userId, room_id: roomId },
          { strikes: { strike3: { $inc: 1 } } }
        );
        if (turn % 2 == 0) {
          this.userStrike();
        } else {
          this.botStrike();
        }
      }
    }
    if (strikes.strike4 !== 1) {
      if (matrix[0] === "x" && matrix[3] === "o" && matrix[6] === "x") {
        await roomSqlLib.updateStrike(
          { user_id: userId, room_id: roomId },
          { strikes: { strike4: { $inc: 1 } } }
        );
        if (turn % 2 == 0) {
          this.userStrike();
        } else {
          this.botStrike();
        }
      }
    }
    if (strikes.strike5 !== 1) {
      if (matrix[1] === "x" && matrix[4] === "o" && matrix[7] === "x") {
        await roomSqlLib.updateStrike(
          { user_id: userId, room_id: roomId },
          { strikes: { strike5: { $inc: 1 } } }
        );
        if (turn % 2 == 0) {
          this.userStrike();
        } else {
          this.botStrike();
        }
      }
    }
    if (strikes.strike6 !== 1) {
      if (matrix[2] === "x" && matrix[5] === "o" && matrix[8] === "x") {
        await roomSqlLib.updateStrike(
          { user_id: userId, room_id: roomId },
          { strikes: { strike6: { $inc: 1 } } }
        );
        if (turn % 2 == 0) {
          this.userStrike();
        } else {
          this.botStrike();
        }
      }
    }
    if (strikes.strike7 !== 1) {
      if (matrix[0] === "x" && matrix[4] === "o" && matrix[8] === "x") {
        await roomSqlLib.updateStrike(
          { user_id: userId, room_id: roomId },
          { strikes: { strike7: { $inc: 1 } } }
        );
        if (turn % 2 == 0) {
          this.userStrike();
        } else {
          this.botStrike();
        }
      }
    }
    if (strikes.strike8 !== 1) {
      if (matrix[2] === "x" && matrix[4] === "o" && matrix[6] === "x") {
        await roomSqlLib.updateStrike(
          { user_id: userId, room_id: roomId },
          { strikes: { strike8: { $inc: 1 } } }
        );
        if (turn % 2 == 0) {
          this.userStrike();
        } else {
          this.botStrike();
        }
      }
    }
  }

  chooseTurn(matrix) {
    const turn = matrix
      .map((item, i) => (item == "" ? i : 9))
      .filter((x) => x != 9);
    return turn.length;
  }

  async executeMethod() {
    try {
      let [roomSqlLib] = AutoLoad.loadLibray("sqlLib", ["room"]);
      let [roomHelperLib] = AutoLoad.loadLibray("helperLib", ["room"]);

      let { userObj } = this;

      let { index, value, roomId } = this;

      let room = await roomSqlLib.findRooms(userObj.user_id, roomId);
      let matrix = room.matrix;
      if (typeof matrix === "string") {
        matrix = JSON.parse(matrix);
        if (matrix[index] == "") {
          matrix.splice(index, 1, value);
          await roomSqlLib.updateMatrix(userObj.user_id, roomId, matrix);
          const userTurns = this.chooseTurn(matrix);
          this.winnerSelection(matrix, userTurns, userObj.user_id, roomId);
            // let botTurn = this.chooseTurn(matrix);
            // if (botTurn % 2 == 0) {
            //   //taking index of empty elements in matrix array
            //   const indexOfMatrixElements = matrix
            //     .map((item, i) => (item == "" ? i : 9))
            //     .filter((x) => x != 9);
            //   //return index indexOf Matrix's EmptyElements
            //   const indexForBotSelection = this.generateRandomIndex(
            //     indexOfMatrixElements.length
            //   );
            //   const botSelectedData = this.getRandomBotDecision();
            //   const botSelectedIndex = indexOfMatrixElements[indexForBotSelection];
            //   matrix.splice(botSelectedIndex, 1, botSelectedData);
            //   botTurn = this.chooseTurn(matrix);
            //   this.winnerSelection(matrix, botTurn);
            // } else {
            //   return { matrix, message: "user's Turn" };
            // }
            // let draw = matrix.every((e) => e !== "");
            // if (draw) {
            //   if (userCount > botCount) {
            //     await userSqlLib.update(GLB.WINNING_POINTS, userObj.user_id);
            //     botCount = userCount = 0;
            //     return { message: "win" };
            //   } else if (botCount > userCount) {
            //     await userSqlLib.updates(GLB.LOST_POINTS, userObj.user_id);
            //     botCount = userCount = 0;
            //     return { message: "you are lost" };
            //   } else {
            //     await userSqlLib.updates(GLB.DRAW_POINTS, userObj.user_id);
            //     botCount = userCount = 0;
            //     return { message: "match draw" };
            //   }
            // }
            // return matrix;
        } else console.log("invalid");
      }
    } catch (e) {
      console.log("Error game =>", e);
    }
  }
}
module.exports = GameAction;
