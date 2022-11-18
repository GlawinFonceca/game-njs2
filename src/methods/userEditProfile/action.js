const { AutoLoad } = require("@njs2/base");

class UserEditProfileAction extends baseAction {
  async executeMethod() {
    try {
      let [userHelperLib] = AutoLoad.loadLibray("helperLib", ["user"]);
      let { userObj } = this;
      let { name, phone } = this;
      let result = await userHelperLib.userUpdate(userObj.user_id, name, phone);
      if (!result || !result.status) {
        this.setResponse("INVALID_USER_CREDENTIALS", {
          message: result.message,
        });
        return {};
      }
      this.setResponse("SUCCESS");
      return {};
    } catch (e) {
      console.log("Error userEditProfile =>", e);
    }
  }
}
module.exports = UserEditProfileAction;
