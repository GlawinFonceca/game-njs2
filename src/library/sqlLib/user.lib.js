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

  async createUser(user) {
    try {
      return await SQLManager.insert("user", user);
    } catch (e) {
      console.log("Error createUser =>", e);
    }
  }

  async updateUsers(query, updates) {
    try {
      return await SQLManager.update("user", query, updates);
    } catch (e) {
      console.log("Error updateUsers =>", e);
    }
  }

  async findUsers(userId){
    try{
      return await SQLManager.find('user',userId);

    }
    catch(e) {
      console.log("Error findUsers =>",e);
    }
  }
}

// await SQLManager.update("user",{user_id:1},{points:{ $dec:100},total_played_ames:{$inc:1}})//$gt: 23872, $lt: 198, $in: [4,4,4]

module.exports = user;
