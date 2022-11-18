const { AutoLoad } = require("@njs2/base");
const user = require("../../library/sqlLib/user.lib");

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

  winnerSelection(matrix) {
    if (matrix[0] === "x" && matrix[1] === "o" && matrix[2] === "x") {
      return true;
    }
    if (matrix[3] === "x" && matrix[4] === "o" && matrix[5] === "x") {
      return true;
    }

    if (matrix[6] === "x" && matrix[7] === "o" && matrix[8] === "x") {
      return true;
    }

    if (matrix[0] === "x" && matrix[3] === "o" && matrix[6] === "x") {
      return true;
    }

    if (matrix[1] === "x" && matrix[4] === "o" && matrix[7] === "x") {
      return true;
    }

    if (matrix[2] === "x" && matrix[5] === "o" && matrix[8] === "x") {
      return true;
    }

    if (matrix[0] === "x" && matrix[4] === "o" && matrix[8] === "x") {
      return true;
    }

    if (matrix[2] === "x" && matrix[4] === "o" && matrix[6] === "x") {
      return true;
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
      if (typeof matrix === "string") matrix = JSON.parse(matrix);

      let result = this.winnerSelection(matrix);
        if (result) {
              await userSqlLib.update(GLB.WINNING_POINTS,userObj.user_id);
              return "win"
        }
        else {
            const userTurn = this.chooseUserTurn(matrix);
            if (userTurn % 2 == 0) {
                //taking index of empty elements in matrix array
                const indexOfMatrixElements = matrix.map((item, i) => item == '' ? i : 9).filter((x) => x != 9);
                //return index indexOfMatrix'sEmptyElements
                const indexForBotSelection = this.generateRandomIndex(indexOfMatrixElements.length)
                const botSelectedData = this.getRandomBotDecision();

                const botSelectedIndex = indexOfMatrixElements[indexForBotSelection];

               matrix.splice(botSelectedIndex, 1, botSelectedData);
            }
            else {
              return {matrix,message:"user"};
          }

          let result = this.winnerSelection(matrix);
          if (result) {
              return{message:"you are lost" }
              }
      }

      let draw = matrix.every((e) => e !== '')
      if (draw) {
        await userSqlLib.update(GLB.DRAW_POINTS,userObj.user_id)
              return {message:"match draw"}
      }
      return matrix;
    } catch (e) {
      console.log("Error game =>", e);
    }
  }
}
module.exports = GameAction;
