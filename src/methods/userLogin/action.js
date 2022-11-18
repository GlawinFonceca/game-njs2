const bcrypt = require("bcrypt");

class UserLoginAction extends baseAction {
  async executeMethod() {
    try {
      let [jwtHelperLib] = AutoLoad.loadLibray("helperLib", ["jwtEncode"]);
      let [userSqlLib] = AutoLoad.loadLibray("sqlLib", ["user"]);
      let { email, password } = this;

      let user = await userSqlLib.getUser(email);
      if (!user) {
        this.setResponse("INVALID_USER_CREDENTIALS", { message: "email" });
        return {};
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        this.setResponse("INVALID_USER_CREDENTIALS", { message: "password" });
      }
      let accessToken = await jwtHelperLib.jwtEncryption(user.user_id);
      await userSqlLib.updateUsers(
        { user_id: user.user_id },
        { access_token: accessToken }
      );
      this.setResponse("SUCCESS");
      return { access_token: accessToken };
    } catch (e) {
      console.log("Error userLogin =>", e);
    }
  }
}
module.exports = UserLoginAction;
