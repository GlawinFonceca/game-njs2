let userCount = 0;
let botCount = 0;
let constant1,
  constant2,
  constant3,
  constant4,
  constant5,
  constant6,
  constant7,
  constant8 = 0;

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

  winnerSelection(matrix, userTurn) {
    if (constant1 !== 1) {
      if (matrix[0] === "x" && matrix[1] === "o" && matrix[2] === "x") {
        if (userTurn % 2 == 0) {
          this.userStrike();
          constant1 = 1;
        } else {
          this.botStrike();
          constant1 = 1;
        }
      }
    }
    if (constant2 !== 2) {
      if (matrix[3] === "x" && matrix[4] === "o" && matrix[5] === "x") {
        if (userTurn % 2 == 0) {
          this.userStrike();
          constant2 = 2;
        } else {
          this.botStrike();
          constant2 = 2;
        }
      }
    }
    if (constant3 !== 3) {
      if (matrix[6] === "x" && matrix[7] === "o" && matrix[8] === "x") {
        if (userTurn % 2 == 0) {
          this.userStrike();
          constant3 = 3;
        } else {
          this.botStrike();
          constant3 = 3;
        }
      }
    }
    if (constant4 !== 4) {
      if (matrix[0] === "x" && matrix[3] === "o" && matrix[6] === "x") {
        if (userTurn % 2 == 0) {
          this.userStrike();
          constant4 = 4;
        } else {
          this.botStrike();
          constant4 = 4;
        }
      }
    }
    if (constant5 !== 5) {
      if (matrix[1] === "x" && matrix[4] === "o" && matrix[7] === "x") {
        if (userTurn % 2 == 0) {
          this.userStrike();
          constant5 = 5;
        } else {
          this.botStrike();
          constant5 = 5;
        }
      }
    }
    if (constant6 !== 6) {
      if (matrix[2] === "x" && matrix[5] === "o" && matrix[8] === "x") {
        if (userTurn % 2 == 0) {
          this.userStrike();
          constant6 = 6;
        } else {
          this.botStrike();
          constant6 = 6;
        }
      }
    }
    if (constant7 !== 7) {
      if (matrix[0] === "x" && matrix[4] === "o" && matrix[8] === "x") {
        if (userTurn % 2 == 0) {
          this.userStrike();
          constant7 = 7;
        } else {
          this.botStrike();
          constant7 = 7;
        }
      }
    }
    if (constant8 !== 8) {
      if (matrix[2] === "x" && matrix[4] === "o" && matrix[6] === "x") {
        if (userTurn % 2 == 0) {
          this.userStrike();
          constant8 = 8;
        } else {
          this.botStrike();
          constant8 = 8;
        }
      }
    }
  }

  chooseUserTurn(matrix) {
    const turn = matrix
      .map((item, i) => (item == "" ? i : 9))
      .filter((x) => x != 9);
    return turn.length;
  }

  async executeMethod() {
    try {
      let [userSqlLib] = AutoLoad.loadLibray("sqlLib", ["user"]);
      let { userObj } = this;

      let { matrix } = this;
      if (typeof matrix === "string") {
        matrix = JSON.parse(matrix);

        const userTurnn = this.chooseUserTurn(matrix);
        let result = this.winnerSelection(matrix, userTurnn);

        // if (result) {
        //   await userSqlLib.update(GLB.WINNING_POINTS, userObj.user_id);
        //   return "win";
        // } else {

        let userTurn = this.chooseUserTurn(matrix);
        if (userTurn % 2 == 0) {
          //bot's turn
          //taking index of empty elements in matrix array
          const indexOfMatrixElements = matrix
            .map((item, i) => (item == "" ? i : 9))
            .filter((x) => x != 9);
          //return index indexOf Matrix's EmptyElements
          const indexForBotSelection = this.generateRandomIndex(
            indexOfMatrixElements.length
          );
          const botSelectedData = this.getRandomBotDecision();

          const botSelectedIndex = indexOfMatrixElements[indexForBotSelection];

          matrix.splice(botSelectedIndex, 1, botSelectedData);
          userTurn = this.chooseUserTurn(matrix);
          let result = this.winnerSelection(matrix, userTurn);

          //   if (result) {
          //     await userSqlLib.updates(GLB.LOST_POINTS, userObj.user_id);
          //     return { message: "you are lost" };
          //   }
        } else {
          return { matrix, message: "user" };
        }
        let draw = matrix.every((e) => e !== "");
        if (draw) {
          if (userCount > botCount) {
            await userSqlLib.update(GLB.WINNING_POINTS, userObj.user_id);
            botCount = 0;
            userCount = 0;
            constant1 = constant2 = constant3 = constant4 = constant5 = constant6 = constant7 = constant8 = 0;
            return "win";
          } else if (botCount > userCount) {
            await userSqlLib.updates(GLB.LOST_POINTS, userObj.user_id);
            botCount = 0;
            userCount = 0;
            constant1 = constant2 = constant3 = constant4 = constant5 = constant6 = constant7 = constant8 = 0;
            return { message: "you are lost" };
          } else if (userCount >= 0 === botCount >= 0) {
            await userSqlLib.updates(GLB.DRAW_POINTS, userObj.user_id);
            botCount = 0;
            userCount = 0;
            constant1 = constant2 = constant3 = constant4 = constant5 = constant6 = constant7 = constant8 = 0;
            return { message: "match draw" };
          }
        }
        return matrix;

        // let draw = matrix.every((e) => e !== "");
        // if (draw) {
        //   await userSqlLib.updates(GLB.DRAW_POINTS, userObj.user_id);
        //   return { message: "match draw" };
        // } else {
      }
      //}
    } catch (e) {
      console.log("Error game =>", e);
    }
  }
}
module.exports = GameAction;
