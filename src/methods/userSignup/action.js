const bcrypt = require('bcrypt')

class UserSignupAction extends baseAction {
  async executeMethod() {
    try {
      let [userHelperLib,jwtHelperLib] = AutoLoad.loadLibray("helperLib", ["user","jwtEncode"]);
      let [userSqlLib] = AutoLoad.loadLibray("sqlLib", ["user"]);
      let { name, email, password, phone } = this;

      const isValid = await userHelperLib.signupValidation(
        name,
        email,
        password,
        phone
      );
      if (!isValid || !isValid.status) {
        this.setResponse("INVALID_USER_CREDENTIALS", {
          message: isValid.message,
        });
        return {};
      }
      let user = await userSqlLib.getUser(email);
      if (user) {
        this.setResponse("INVALID_USER", { message: "User already exists" });
        return {};
      }
      password = await bcrypt.hash(password,GLB.SALTROUNDS);
      let userObj = {
        name,
        email,
        password,
        phone,
      };
      let userId = await userSqlLib.create(userObj);
      let accessToken = await jwtHelperLib.jwtEncryption(userId);
      this.setResponse("SUCCESS");
      return { access_token: accessToken };
    } catch (e) {
      console.log("Error userSignup =>", e);
    }
  }
}
module.exports = UserSignupAction;
