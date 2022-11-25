class SocketConnectAction extends baseAction {
  async executeMethod() {
    try {
      let { userObj, socketId } = this;
      let [userSqlLib] = AutoLoad.loadLibray("sqlLib", ["user"]);

      await userSqlLib.updateUsers(
        { user_id: userObj.user_id },
        { socket_id: socketId }
      );
      this.setResponse("SUCCESS");
      return {};
    } catch (e) {
      console.log("Error socketConnect =>", e);
    }
  }
}
module.exports = SocketConnectAction;
