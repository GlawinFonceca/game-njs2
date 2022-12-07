class SendMessageAction extends baseAction {
  async executeMethod() {
    let { userId, message } = this;

    let [userSqlLib] = AutoLoad.loadLibray("sqlLib", ["user"]);

    if (userId) {
      const user = await userSqlLib.getUsers(userId);
      if (!user.socket_id) {
        this.setResponse("SOCKETID_NOT_FOUND");
        return {};
      }
      SOCKETManager.emit(user.socket_id, message);
      this.setResponse("SUCCESS");
      return {};
    }
    const connectedUsers = await userSqlLib.findUsers();
    const socketId = connectedUsers.map((s_id) => {
      return s_id.socket_id;
    });

    //exclude user
    // const socketId = connectedUsers.map((s_id) =>{
    //   if(s_id.user_id !== userId)
    //   return s_id.socket_id;
    // });

    socketId.map((s_id) => {
      SOCKETManager.emit(s_id, message);
    });
    this.setResponse("SUCCESS");
    return {};
  }
}
module.exports = SendMessageAction;
