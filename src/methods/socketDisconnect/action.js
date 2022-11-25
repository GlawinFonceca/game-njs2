class SocketDisconnectAction extends baseAction {
  async executeMethod() {
    try {
      let { socketId } = this;
      let [userSqlLib] = AutoLoad.loadLibray("sqlLib", ["user"]);
      await userSqlLib.updateUsers(
        { socket_id: socketId },
        { socket_id: 0 }
      );

      this.setResponse("SUCCESS");
      return {};
    } catch (e) {
      console.log("Error socketDisconnect =>", e);
    }
  }
}
module.exports = SocketDisconnectAction;
