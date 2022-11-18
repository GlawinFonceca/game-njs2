class UserProfileAction extends baseAction {
  async executeMethod() {
    try {
      let { userObj } = this;
      delete userObj.password;
      delete userObj.access_token;
      delete userObj.createdAt;
      this.setResponse("SUCCESS");
      return { userDetails: userObj };
    } catch (e) {
      console.log("Error userProfile =>", e);
    }
  }
}
module.exports = UserProfileAction;
