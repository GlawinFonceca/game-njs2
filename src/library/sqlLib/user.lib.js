const SQLManager = require("@njs2/sql");

class user {
  async getUser(email) {
    try {
      return await SQLManager.findOne("user", { email: email });
    } catch (e) {
      console.log("Error getUser =>", e);
    }
  }
  async getUsers(userId) {
    try {
      return await SQLManager.findOne("user", { user_id: userId });
    } catch (e) {
      console.log("Error getUsers =>", e);
    }
  }

  async create(userObj) {
    try {
      return await SQLManager.insert("user", userObj);
    } catch (e) {
      console.log("Error create =>", e);
    }
  }

  async updateUsers(query, updates) {
    try {
      return await SQLManager.update("user", query, updates);
    } catch (e) {
      console.log("Error updateUsers =>", e);
    }
  }

  async update(point, userId) {
    try {
      return await SQLManager.update(
        "user",
        { user_id: userId },
        {
          points: { $inc: point },
          win_games: { $inc: 1 },
          total_played_games: { $inc: 1 },
        }
      );
    } catch (e) {
      console.log("Error update =>", e);
    }
  }

  async updates(point, userId) {
    try {
      return await SQLManager.update(
        "user",
        { user_id: userId },
        {
          points: { $inc: point },
          total_played_games: { $inc: 1 },
        }
      );
    } catch (e) {
      console.log("Error update =>", e);
    }
  }
  // await SQLManager.update("user",{user_id:1},{points:{ $dec:100},total_played_ames:{$inc:1}})//$gt: 23872, $lt: 198, $in: [4,4,4]
}

module.exports = user;
