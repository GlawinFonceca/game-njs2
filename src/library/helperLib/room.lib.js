class room {
  async joinRoom(user) {
    try {
      let [userSqlLib,roomSqlLib] = AutoLoad.loadLibray("sqlLib", ["user","room"]);
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
        const updated = await userSqlLib.userUpdate(
          GLB.POINTS,
          user.user_id
        );
        let userData = {
          user_id: user.user_id,
          status: GLB.STATUS,
          strikes: strike,
        };
        if (updated) {
          return await roomSqlLib.create(userData);
        }
      } else {
        return false;
      }
    } catch (e) {
      console.log("Error join =>", e);
    }
  }
}

module.exports = room;
