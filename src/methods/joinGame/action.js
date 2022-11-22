class JoinGameAction extends baseAction {
  async executeMethod() {
    let {userObj} =this;
    let { game_mode, room_id } = this;

    if (game_mode == 0) {
      let user = await SQLManager.find("room", {
        user_id: userObj.user_id,
      });
      if (!user) {
        this.setResponse("SUCCESS");
        return { message :"room not found"}
      } else {
        this.setResponse("SUCCESS");
        return user.room_id;
      }
    }

     else if (game_mode == 1) {
      let { room_id } = this;
      if (!room_id) {
        this.setResponse("SUCCESS");
        return { message: "" };
      }
      const data = await SQLManager.findOne("room", { room_id: room_id });
      const matrix = JSON.parse(data.matrix);
      this.setResponse("SUCCESS");
      return { matrix: matrix };
    }
    else if (game_mode === 2) {
      let user = await SQLManager.findOne("room", {
        user_id: userObj.user_id,
      });
      if (user.status !== 2) {

        
    
    }
  }
  }
}
module.exports = JoinGameAction;
