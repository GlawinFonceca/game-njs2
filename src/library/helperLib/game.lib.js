class game {
  async winnerSelection(matrix, strike, turn, userId, roomId) {
    try {
      let [roomSqlLib] = AutoLoad.loadLibray("sqlLib", ["room"]);
      const strikes = JSON.stringify(strike);
      if (strike.strike1 !== 1) {
        if (matrix[0] === "x" && matrix[1] === "o" && matrix[2] === "x") {
          await roomSqlLib.updateDefaultStrikes(
            userId,
            roomId,
            strikes,
            "$.strike1"
          );
          if (turn % 2 == 0) {
            await roomSqlLib.updateStrike(
              { user_id: userId, room_id: roomId },
              { user_strike: { $inc: 1 } }
            );
          } else {
            await roomSqlLib.updateStrike(
              { user_id: userId, room_id: roomId },
              { bot_strike: { $inc: 1 } }
            );
          }
        }
      }
      if (strike.strike2 !== 1) {
        if (matrix[3] === "x" && matrix[4] === "o" && matrix[5] === "x") {
          await roomSqlLib.updateDefaultStrikes(
            userId,
            roomId,
            strikes,
            "$.strike2"
          );
          if (turn % 2 == 0) {
            await roomSqlLib.updateStrike(
              { user_id: userId, room_id: roomId },
              { user_strike: { $inc: 1 } }
            );
          } else {
            await roomSqlLib.updateStrike(
              { user_id: userId, room_id: roomId },
              { bot_strike: { $inc: 1 } }
            );
          }
        }
      }
      if (strike.strike3 !== 1) {
        if (matrix[6] === "x" && matrix[7] === "o" && matrix[8] === "x") {
          await roomSqlLib.updateDefaultStrikes(
            userId,
            roomId,
            strikes,
            "$.strike3"
          );
          if (turn % 2 == 0) {
            await roomSqlLib.updateStrike(
              { user_id: userId, room_id: roomId },
              { user_strike: { $inc: 1 } }
            );
          } else {
            await roomSqlLib.updateStrike(
              { user_id: userId, room_id: roomId },
              { bot_strike: { $inc: 1 } }
            );
          }
        }
      }
      if (strike.strike4 !== 1) {
        if (matrix[0] === "x" && matrix[3] === "o" && matrix[6] === "x") {
          await roomSqlLib.updateDefaultStrikes(
            userId,
            roomId,
            strikes,
            "$.strike4"
          );
          if (turn % 2 == 0) {
            await roomSqlLib.updateStrike(
              { user_id: userId, room_id: roomId },
              { user_strike: { $inc: 1 } }
            );
          } else {
            await roomSqlLib.updateStrike(
              { user_id: userId, room_id: roomId },
              { bot_strike: { $inc: 1 } }
            );
          }
        }
      }
      if (strike.strike5 !== 1) {
        if (matrix[1] === "x" && matrix[4] === "o" && matrix[7] === "x") {
          await roomSqlLib.updateDefaultStrikes(
            userId,
            roomId,
            strikes,
            "$.strike5"
          );
          if (turn % 2 == 0) {
            await roomSqlLib.updateStrike(
              { user_id: userId, room_id: roomId },
              { user_strike: { $inc: 1 } }
            );
          } else {
            await roomSqlLib.updateStrike(
              { user_id: userId, room_id: roomId },
              { bot_strike: { $inc: 1 } }
            );
          }
        }
      }
      if (strike.strike6 !== 1) {
        if (matrix[2] === "x" && matrix[5] === "o" && matrix[8] === "x") {
          await roomSqlLib.updateDefaultStrikes(
            userId,
            roomId,
            strikes,
            "$.strike6"
          );
          if (turn % 2 == 0) {
            await roomSqlLib.updateStrike(
              { user_id: userId, room_id: roomId },
              { user_strike: { $inc: 1 } }
            );
          } else {
            await roomSqlLib.updateStrike(
              { user_id: userId, room_id: roomId },
              { bot_strike: { $inc: 1 } }
            );
          }
        }
      }
      if (strike.strike7 !== 1) {
        if (matrix[0] === "x" && matrix[4] === "o" && matrix[8] === "x") {
          await roomSqlLib.updateDefaultStrikes(
            userId,
            roomId,
            strikes,
            "$.strike7"
          );
          if (turn % 2 == 0) {
            await roomSqlLib.updateStrike(
              { user_id: userId, room_id: roomId },
              { user_strike: { $inc: 1 } }
            );
          } else {
            await roomSqlLib.updateStrike(
              { user_id: userId, room_id: roomId },
              { bot_strike: { $inc: 1 } }
            );
          }
        }
      }
      if (strike.strike8 !== 1) {
        if (matrix[2] === "x" && matrix[4] === "o" && matrix[6] === "x") {
          await roomSqlLib.updateDefaultStrikes(
            userId,
            roomId,
            strikes,
            "$.strike8"
          );
          if (turn % 2 == 0) {
            await roomSqlLib.updateStrike(
              { user_id: userId, room_id: roomId },
              { user_strike: { $inc: 1 } }
            );
          } else {
            await roomSqlLib.updateStrike(
              { user_id: userId, room_id: roomId },
              { bot_strike: { $inc: 1 } }
            );
          }
        }
      }
    } catch (e) {
      console.log("Error winnerSelection =>", e);
    }
  }

  generateRandomIndex(num) {
    try {
      let item = Math.floor(Math.random() * (num - 1));
      return item;
    } catch (e) {
      console.log("Error generateRandomIndex =>", e);
    }
  }

  getRandomBotDecision() {
    try {
      let item = Math.floor(Math.random() * 2);
      if (item === 0) {
        return "x";
      } else {
        return "o";
      }
    } catch (e) {
      console.log("Error getRandomBotDecision =>", e);
    }
  }

  chooseTurn(matrix) {
    try {
      const turn = matrix
        .map((item, i) => (item == "" ? i : 9))
        .filter((x) => x != 9);
      return turn.length;
    } catch (e) {
      console.log("Error chooseTurn =>", e);
    }
  }

  indexValidation(index) {
    try {
      if (index >= 0 && index <= 8) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log("Error indexValidation =>", e);
    }
  }

  valueValidation(value) {
    try {
      if (value === "x" || value === "o") {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log("Error valueValidation =>", e);
    }
  }
}

module.exports = game;
