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

  async winnerSelection(matrix, turn, userId) {
    let strike = await SQLManager.findOne("room", { user_id: userId });
    let strikes = strike.strikes;
    console.log(strikes.strike1);

    // if (strikes.strike1 !==1) {
    //   if (matrix[0] === "x" && matrix[1] === "o" && matrix[2] === "x") {
    //     await SQLManager.update("room",{user_id : userId},strikes.strike1 = 1)
    //     if (turn % 2 == 0) {
    //       this.userStrike();
    //     } else {
    //       this.botStrike();
    //     }
    //   }
    // }
    // if (constant2 !== 2) {
    //   if (matrix[3] === "x" && matrix[4] === "o" && matrix[5] === "x") {
    //     constant2 = 2;
    //     if (turn % 2 == 0) {
    //       this.userStrike();
    //     } else {
    //       this.botStrike();
    //     }
    //   }
    // }
    // if (constant3 !== 3) {
    //   if (matrix[6] === "x" && matrix[7] === "o" && matrix[8] === "x") {
    //     constant3 = 3;
    //     if (turn % 2 == 0) {
    //       this.userStrike();
    //     } else {
    //       this.botStrike();
    //     }
    //   }
    // }
    // if (constant4 !== 4) {
    //   if (matrix[0] === "x" && matrix[3] === "o" && matrix[6] === "x") {
    //     constant4 = 4;
    //     if (turn % 2 == 0) {
    //       this.userStrike();
    //     } else {
    //       this.botStrike();
    //     }
    //   }
    // }
    // if (constant5 !== 5) {
    //   if (matrix[1] === "x" && matrix[4] === "o" && matrix[7] === "x") {
    //     constant5 = 5;
    //     if (turn % 2 == 0) {
    //       this.userStrike();
    //     } else {
    //       this.botStrike();
    //     }
    //   }
    // }
    // if (constant6 !== 6) {
    //   if (matrix[2] === "x" && matrix[5] === "o" && matrix[8] === "x") {
    //     constant6 = 6;
    //     if (turn % 2 == 0) {
    //       this.userStrike();
    //     } else {
    //       this.botStrike();
    //     }
    //   }
    // }
    // if (constant7 !== 7) {
    //   if (matrix[0] === "x" && matrix[4] === "o" && matrix[8] === "x") {
    //     constant7 = 7;
    //     if (turn % 2 == 0) {
    //       this.userStrike();
    //     } else {
    //       this.botStrike();
    //     }
    //   }
    // }
    // if (constant8 !== 8) {
    //   if (matrix[2] === "x" && matrix[4] === "o" && matrix[6] === "x") {
    //     constant8 = 8;
    //     if (turn % 2 == 0) {
    //       this.userStrike();
    //     } else {
    //       this.botStrike();
    //     }
    //   }
    // }
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
      let [userHelperLib] = AutoLoad.loadLibray("helperLib", ["room"]);

      let { userObj } = this;

      let { index, value } = this;

        if (typeof matrix === "string") {
          matrix = JSON.parse(matrix);
          const userTurns = this.chooseUserTurn(matrix);
          this.winnerSelection(matrix, userTurns,userObj.user_id);
          let botTurn = this.chooseUserTurn(matrix);
          if (botTurn % 2 == 0) {
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
            botTurn = this.chooseUserTurn(matrix);
            this.winnerSelection(matrix, botTurn);
          } else {
            return { matrix, message: "user's Turn" };
          }
          let draw = matrix.every((e) => e !== "");
          if (draw) {
            if (userCount > botCount) {
              await userSqlLib.update(GLB.WINNING_POINTS, userObj.user_id);
              botCount = userCount = 0;
              return { message: "win" };
            } else if (botCount > userCount) {
              await userSqlLib.updates(GLB.LOST_POINTS, userObj.user_id);
              botCount = userCount = 0;
              return { message: "you are lost" };
            } else {
              await userSqlLib.updates(GLB.DRAW_POINTS, userObj.user_id);
              botCount = userCount = 0;
              return { message: "match draw" };
            }
          }
          return matrix;
        }
     

      }
    
     catch (e) {
      console.log("Error game =>", e);
    }
  }
}
module.exports = GameAction;
