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
}

module.exports = user;
