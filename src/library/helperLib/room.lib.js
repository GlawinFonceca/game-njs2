const SQLManager = require("@njs2/sql");

class room {
  async joinRoom(user) {
    try {
      let [userSqlLib] = AutoLoad.loadLibray("sqlLib", ["user"]);
      const strike = {
        strike1: 0,
        strike2: 0,
        strike3: 0,
        strike4: 0,
        strike5: 0,
        strike6: 0,
        strike7: 0,
        strike8: 0,
      };
      if (user.points >= GLB.POINTS) {
        const result = await userSqlLib.userEntry(
          GLB.ENTRY_DEDUCT_POINTS,
          user.user_id
        );
        let userData = {
          user_id: user.user_id,
          status: GLB.STATUS,
          strikes: strike,
        };
        if (result) {
          return await SQLManager.insert("room",userData); 
        }
      } else {
        console.log("insufficient balance");
        return false;
      }
    } catch (e) {
      console.log("Error join =>", e);
    }
  }
}

module.exports = room;
