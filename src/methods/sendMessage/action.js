const { AutoLoad } = require("@njs2/base");

class SendMessageAction extends baseAction {

  async executeMethod() {
    let { userId,message } = this;

    let [userSqlLib] = AutoLoad.loadLibray("sqlLib",["user"]);
    const user = await userSqlLib.getUsers(userId);
    if(!user.socket_id){
      this.setResponse("SOCKETID_NOT_FOUND");
      return{}
    }
    SOCKETManager.emit(user.socket_id,message);

    
    this.setResponse('SUCCESS');
    return {};
  };

}
module.exports = SendMessageAction;